import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(roles)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Role name is required' },
        { status: 400 }
      )
    }

    const role = await prisma.role.create({
      data: { name: name.trim() },
    })

    return NextResponse.json(role, { status: 201 })
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { error: 'A role with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 })
  }
}
