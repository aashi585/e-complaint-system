"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { NavigationHeader } from "@/components/navigation-header"
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      title: "Library WiFi Issues",
      category: "Infrastructure",
      status: "In Progress",
      date: "2024-01-15",
      priority: "Medium",
    },
    {
      id: "CMP002",
      title: "Canteen Food Quality",
      category: "Food Services",
      status: "Resolved",
      date: "2024-01-10",
      priority: "High",
    },
  ])

  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "",
    description: "",
    priority: "Medium",
  })

  const handleSubmitComplaint = (e) => {
    e.preventDefault()
    const complaint = {
      id: `CMP${String(complaints.length + 1).padStart(3, "0")}`,
      ...newComplaint,
      status: "Submitted",
      date: new Date().toISOString().split("T")[0],
    }
    setComplaints([complaint, ...complaints])
    setNewComplaint({ title: "", category: "", description: "", priority: "Medium" })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <NavigationHeader userName="John Doe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Aashi</h2>
          <p className="text-gray-600">Student ID: 2021CS001 | Computer Science Engineering</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                  <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
                </div>
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {complaints.filter((c) => c.status === "In Progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {complaints.filter((c) => c.status === "Resolved").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {complaints.filter((c) => c.status === "Submitted").length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="complaints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="complaints">My Complaints</TabsTrigger>
            <TabsTrigger value="new">Submit New Complaint</TabsTrigger>
          </TabsList>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Complaints</CardTitle>
                <CardDescription>Track the status of all your submitted complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                            <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                            <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Category: {complaint.category}</p>
                          <p className="text-sm text-gray-500">Submitted: {complaint.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">#{complaint.id}</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Submit New Complaint</span>
                </CardTitle>
                <CardDescription>Fill out the form below to submit a new complaint</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComplaint} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Complaint Title</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        value={newComplaint.title}
                        onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newComplaint.category}
                        onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="Food Services">Food Services</SelectItem>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Hostel">Hostel</SelectItem>
                          <SelectItem value="Library">Library</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={newComplaint.priority}
                      onValueChange={(value) => setNewComplaint({ ...newComplaint, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about your complaint..."
                      rows={4}
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
