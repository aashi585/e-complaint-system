"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { NavigationHeader } from "@/components/navigation-header"
import { FileText, Clock, CheckCircle, AlertTriangle, Search, Filter } from "lucide-react"

export default function CoordinatorDashboard() {
  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      title: "Library WiFi Issues",
      student: "Aashi (2021CS001)",
      category: "Infrastructure",
      status: "In Progress",
      priority: "Medium",
      date: "2024-01-15",
      assignedTo: "IT Department",
    },
    {
      id: "CMP003",
      title: "Classroom Projector Not Working",
      student: "Jane Smith (2021CS002)",
      category: "Infrastructure",
      status: "Submitted",
      priority: "High",
      date: "2024-01-16",
      assignedTo: null,
    },
    {
      id: "CMP004",
      title: "Lab Equipment Maintenance",
      student: "Mike Johnson (2021CS003)",
      category: "Academic",
      status: "Under Review",
      priority: "Medium",
      date: "2024-01-14",
      assignedTo: "Lab Technician",
    },
  ])

  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = filterStatus === "all" || complaint.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.student.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const updateComplaintStatus = (id, newStatus, assignedTo = null) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: newStatus, assignedTo: assignedTo || complaint.assignedTo }
          : complaint,
      ),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-purple-100 text-purple-800"
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
      <NavigationHeader userName="Miss Annu Yadav" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome,Miss Annu Yadav</h2>
          <p className="text-gray-600">Class Coordinator | Computer Science Engineering | Batch 2021-2025</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {complaints.filter((c) => c.status === "Submitted" || c.status === "Under Review").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
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
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
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
        </div>

        {/* Main Content */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Complaints</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search complaints or students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="under review">Under Review</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complaints List */}
            <Card>
              <CardHeader>
                <CardTitle>Class Complaints</CardTitle>
                <CardDescription>Manage and track complaints from your class students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                            <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                            <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Student: {complaint.student}</p>
                          <p className="text-sm text-gray-600 mb-1">Category: {complaint.category}</p>
                          <p className="text-sm text-gray-500">Submitted: {complaint.date}</p>
                          {complaint.assignedTo && (
                            <p className="text-sm text-indigo-600 mt-1">Assigned to: {complaint.assignedTo}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 mb-2">#{complaint.id}</p>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              View Details
                            </Button>
                            <Select
                              value={complaint.status}
                              onValueChange={(value) => updateComplaintStatus(complaint.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Submitted">Submitted</SelectItem>
                                <SelectItem value="Under Review">Under Review</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Infrastructure", "Academic", "Food Services", "Transportation"].map((category) => {
                      const count = complaints.filter((c) => c.category === category).length
                      const percentage = complaints.length > 0 ? (count / complaints.length) * 100 : 0
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-600">2.5</p>
                    <p className="text-sm text-gray-600">Average days to resolve</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
