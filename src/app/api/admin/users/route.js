import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(users)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, username, roleId } = await request.json()

    if (!name || !username || !roleId) {
      return NextResponse.json(
        { error: 'Name, username, and role are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        username: username.trim(),
        roleId: parseInt(roleId),
      },
      include: { role: true },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this username already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
