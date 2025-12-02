import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient, JobStatus } from "@prisma/client"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()


export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user?.id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const stats = await prisma.job.groupBy({
      by: ["status"],
      where: { userId: user.id },
      _count: {
        status: true,
      },
    })

    const formattedStats = {
      total: 0,
      [JobStatus.APPLIED]: 0,
      [JobStatus.INTERVIEW]: 0,
      [JobStatus.OFFER]: 0,
      [JobStatus.REJECTED]: 0,
    }

    stats.forEach((stat: { status: JobStatus; _count: { status: number } }) => {
      formattedStats[stat.status] = stat._count.status
      formattedStats.total += stat._count.status
    })

    // Get monthly applications for chart
    const monthlyApplications = await prisma.$queryRaw<Array<{ month: string; count: bigint }>>`
      SELECT TO_CHAR("createdAt", 'Mon') as month, COUNT(*) as count
      FROM "Job"
      WHERE "userId" = ${user.id}
      GROUP BY TO_CHAR("createdAt", 'Mon'), DATE_TRUNC('month', "createdAt")
      ORDER BY DATE_TRUNC('month', "createdAt") DESC
      LIMIT 6
    `

    // Convert BigInt to number for JSON serialization
    const serializedMonthlyApplications = monthlyApplications.map(item => ({
      month: item.month,
      count: Number(item.count)
    }))

    return NextResponse.json({ stats: formattedStats, monthlyApplications: serializedMonthlyApplications })
  } catch (error) {
    console.error("Stats API Error:", error)
    return NextResponse.json({ 
      message: "Something went wrong", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}
