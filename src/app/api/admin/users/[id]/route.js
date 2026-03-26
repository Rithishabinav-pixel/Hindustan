import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    const { name, username, roleId } = await request.json()

    if (!name || !username || !roleId) {
      return NextResponse.json(
        { error: 'Name, username, and role are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: name.trim(),
        username: username.trim(),
        roleId: parseInt(roleId),
      },
      include: { role: true },
    })

    return NextResponse.json(user)
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this username already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
