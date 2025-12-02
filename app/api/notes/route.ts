import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

const noteSchema = z.object({
  jobId: z.string().min(1),
  content: z.string().min(1, "Note content is required"),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { jobId, content } = noteSchema.parse(body)

    // Verify job ownership
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (job.userId !== user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const note = await prisma.note.create({
      data: {
        jobId,
        content,
      },
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
