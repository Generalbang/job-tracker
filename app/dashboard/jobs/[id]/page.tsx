"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, MapPin, Building, Briefcase, Trash2, Pencil } from "lucide-react"
import { format } from "date-fns"
import { Job, Note, JobStatus, JobType } from "@prisma/client"

interface JobWithNotes extends Job {
  notes: Note[]
}

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [job, setJob] = useState<JobWithNotes | null>(null)
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Job>>({})

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`)
        if (res.ok) {
          const data = await res.json()
          setJob(data)
          setEditForm(data)
        } else {
          router.push("/dashboard/jobs")
        }
      } catch (error) {
        console.error("Failed to fetch job", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id, router])

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (!job) return
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setJob({ ...job, status: newStatus })
      }
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job application?")) return
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        router.push("/dashboard/jobs")
      }
    } catch (error) {
      console.error("Failed to delete job", error)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })
      if (res.ok) {
        const updatedJob = await res.json()
        setJob({ ...job!, ...updatedJob })
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Failed to update job", error)
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!job) return
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id, content: newNote }),
      })
      if (res.ok) {
        const note = await res.json()
        setJob({ ...job, notes: [note, ...job.notes] })
        setNewNote("")
      }
    } catch (error) {
      console.error("Failed to add note", error)
    }
  }

  // Note functionality would go here (requires separate API or nested update)
  // For MVP, we'll just display them as part of the job fetch

  if (loading) return <div>Loading...</div>
  if (!job) return <div>Job not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex-1" />
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Job Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Input 
                  value={editForm.position} 
                  onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input 
                  value={editForm.company} 
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  value={editForm.location || ""} 
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{job.position}</CardTitle>
                  <p className="text-lg text-muted-foreground">{job.company}</p>
                </div>
                <Badge className="text-base px-4 py-1">{job.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {job.location || "Remote"}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {job.jobType.replace("_", " ")}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Applied: {format(new Date(job.appliedDate), "MMM d, yyyy")}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-base mb-2 block">Status</Label>
                <div className="flex gap-2">
                  {Object.values(JobStatus).map((status) => (
                    <Button
                      key={status}
                      variant={job.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className="mb-6 space-y-4">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button type="submit" size="sm" disabled={!newNote.trim()}>
                  Add Note
                </Button>
              </form>
              <div className="space-y-4">
                {job.notes.map((note) => (
                  <div key={note.id} className="border-l-2 border-primary pl-4 py-2">
                    <p className="text-sm text-gray-500 mb-1">
                      {format(new Date(note.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                    <p>{note.content}</p>
                  </div>
                ))}
                {job.notes.length === 0 && (
                  <p className="text-gray-500 italic">No notes yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
