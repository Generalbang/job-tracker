import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient, JobStatus, JobType, Prisma } from "@prisma/client"
import { z } from "zod"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

const jobSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  jobType: z.nativeEnum(JobType),
  status: z.nativeEnum(JobStatus),
  notes: z.string().optional(),
})

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status") as JobStatus | null
  const search = searchParams.get("search")

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const where: Prisma.JobWhereInput = {
      userId: user.id,
    }

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { position: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ]
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(jobs)
  } catch (_error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const data = jobSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Create job and initial note if provided
    const job = await prisma.job.create({
      data: {
        userId: user.id,
        position: data.position,
        company: data.company,
        location: data.location,
        jobType: data.jobType,
        status: data.status,
        notes: data.notes ? {
          create: {
            content: data.notes
          }
        } : undefined
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
