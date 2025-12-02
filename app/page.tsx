"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { ArrowRight, Briefcase, BarChart3, Target, CheckCircle2, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JobTrack
            </span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 animate-fade-in">
            <Target className="w-4 h-4" />
            Your Career Journey, Simplified
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 dark:from-slate-100 dark:via-indigo-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight animate-slide-up">
            Track Every Job Application with Confidence
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed animate-slide-up-delay">
            Stay organized, monitor your progress, and land your dream job faster with our intuitive job application tracker.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-delay">
            <Link href={session ? "/dashboard" : "/register"}>
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                {session ? "Go to Dashboard" : "Start Tracking Free"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Free Forever</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Unlimited Jobs</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Access Anywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-100 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to streamline your job search and maximize your success rate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Centralized Dashboard
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  View all your applications in one place. Track status, deadlines, and progress at a glance.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Visual Analytics
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Understand your job search patterns with beautiful charts and insightful statistics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Status Tracking
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Monitor every stage from application to offer. Never lose track of where you stand.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Timeline Management
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Keep track of application dates, interview schedules, and follow-up reminders.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Progress Insights
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Get actionable insights on your application success rate and areas for improvement.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Notes & Details
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Add custom notes, company details, and interview feedback for each application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-12 md:p-16 text-center space-y-6 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Ready to Take Control of Your Job Search?
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                  Join thousands of job seekers who are landing their dream jobs faster with JobTrack.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href={session ? "/dashboard" : "/register"}>
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                      {session ? "Go to Dashboard" : "Get Started Free"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-indigo-200">
                  No credit card required • Free forever • Get started in seconds
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                JobTrack
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2024 JobTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
