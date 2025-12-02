import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient, JobStatus, JobType } from "@prisma/client"
import { z } from "zod"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

const jobUpdateSchema = z.object({
  position: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  location: z.string().optional(),
  jobType: z.nativeEnum(JobType).optional(),
  status: z.nativeEnum(JobStatus).optional(),
})

export async function GET(req: Request, { params }: { params: Promise<{ id: string; }> }) {
  
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: { notes: { orderBy: { createdAt: "desc" } } },
    })

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    // Verify ownership
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (job.userId !== user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(job)
  } catch (_error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string; }> }) {

  const {id} = await params
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const data = jobUpdateSchema.parse(body)

    const job = await prisma.job.findUnique({ where: { id } })

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (job.userId !== user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data,
    })

    return NextResponse.json(updatedJob)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string; }> }) {

  const {id} = await params
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const job = await prisma.job.findUnique({ where: { id } })

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (job.userId !== user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    await prisma.job.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Job deleted" })
  } catch (_error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
