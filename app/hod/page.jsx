"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavigationHeader } from "@/components/navigation-header"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
  Calendar,
  Download,
} from "lucide-react"

export default function HODDashboard() {
  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      title: "Library WiFi Issues",
      student: "Aashi (2021CS001)",
      coordinator: "Miss Annu yadav",
      category: "Infrastructure",
      status: "In Progress",
      priority: "Medium",
      date: "2024-01-15",
      assignedTo: "cs Department",
      class: "CS-2021",
    },
    {
      id: "CMP002",
      title: "Canteen Food Quality",
      student: "Jane Smith (2021CS002)",
      coordinator: "Miss Annu Yadav",
      category: "Food Services",
      status: "Resolved",
      priority: "High",
      date: "2024-01-10",
      assignedTo: "Canteen Manager",
      class: "CS-2021",
    },
    {
      id: "CMP003",
      title: "Lab Equipment Maintenance",
      student: "Mike Johnson (2022CS001)",
      coordinator: "Prof. John Davis",
      category: "Academic",
      status: "Under Review",
      priority: "High",
      date: "2024-01-16",
      assignedTo: "Lab Technician",
      class: "CS-2022",
    },
    {
      id: "CMP004",
      title: "Hostel Room Issues",
      student: "Alice Brown (2023CS001)",
      coordinator: "Prof. Mary Johnson",
      category: "Infrastructure",
      status: "Escalated",
      priority: "High",
      date: "2024-01-17",
      assignedTo: "Hostel Warden",
      class: "CS-2023",
    },
  ])

  const [filterStatus, setFilterStatus] = useState("all")
  const [filterClass, setFilterClass] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = filterStatus === "all" || complaint.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesClass = filterClass === "all" || complaint.class === filterClass
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesClass && matchesSearch
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
      case "Escalated":
        return "bg-orange-100 text-orange-800"
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

  const departmentStats = {
    totalComplaints: complaints.length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    pending: complaints.filter((c) => c.status === "Submitted" || c.status === "Under Review").length,
    escalated: complaints.filter((c) => c.status === "Escalated").length,
    avgResolutionTime: "3.2 days",
    satisfactionRate: "87%",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <NavigationHeader userName="Dr. Robert Smith" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Dr. Robert Smith</h2>
          <p className="text-gray-600">Head of Department | Computer Science & Engineering</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.totalComplaints}</p>
                </div>
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{departmentStats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Escalated</p>
                  <p className="text-2xl font-bold text-red-600">{departmentStats.escalated}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{departmentStats.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                  <p className="text-2xl font-bold text-blue-600">{departmentStats.avgResolutionTime}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">{departmentStats.satisfactionRate}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="complaints">All Complaints</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Escalated Complaints */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>Escalated Complaints</span>
                  </CardTitle>
                  <CardDescription>Complaints requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaints
                      .filter((c) => c.status === "Escalated")
                      .map((complaint) => (
                        <div key={complaint.id} className="border-l-4 border-red-500 pl-4 py-2">
                          <h4 className="font-semibold text-gray-900">{complaint.title}</h4>
                          <p className="text-sm text-gray-600">
                            Class: {complaint.class} | Coordinator: {complaint.coordinator}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                            <span className="text-xs text-gray-500">{complaint.date}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Department Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Key metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Resolution Rate</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Response Time</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Student Satisfaction</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">87%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Class-wise Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Class-wise Complaint Summary</CardTitle>
                <CardDescription>Overview of complaints by class and coordinator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["CS-2021", "CS-2022", "CS-2023"].map((className) => {
                    const classComplaints = complaints.filter((c) => c.class === className)
                    const resolved = classComplaints.filter((c) => c.status === "Resolved").length
                    const pending = classComplaints.filter((c) => c.status !== "Resolved").length

                    return (
                      <div key={className} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{className}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total:</span>
                            <span className="font-medium">{classComplaints.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Resolved:</span>
                            <span className="text-green-600 font-medium">{resolved}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Pending:</span>
                            <span className="text-orange-600 font-medium">{pending}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search complaints, students, or coordinators..."
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
                        <SelectItem value="escalated">Escalated</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterClass} onValueChange={setFilterClass}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="CS-2021">CS-2021</SelectItem>
                        <SelectItem value="CS-2022">CS-2022</SelectItem>
                        <SelectItem value="CS-2023">CS-2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complaints List */}
            <Card>
              <CardHeader>
                <CardTitle>Department Complaints</CardTitle>
                <CardDescription>All complaints across the Computer Science Department</CardDescription>
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
                          <p className="text-sm text-gray-600 mb-1">Coordinator: {complaint.coordinator}</p>
                          <p className="text-sm text-gray-600 mb-1">
                            Class: {complaint.class} | Category: {complaint.category}
                          </p>
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
                                <SelectItem value="Escalated">Escalated</SelectItem>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Trends</CardTitle>
                  <CardDescription>Monthly complaint submission trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <BarChart3 className="h-16 w-16 mb-4" />
                    <p>Chart visualization would be implemented here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Complaints by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Infrastructure", "Academic", "Food Services", "Transportation", "Hostel"].map((category) => {
                      const count = complaints.filter((c) => c.category === category).length
                      const percentage = complaints.length > 0 ? (count / complaints.length) * 100 : 0
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Generate Reports</span>
                </CardTitle>
                <CardDescription>Generate comprehensive reports for department analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly Summary</SelectItem>
                          <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                          <SelectItem value="annual">Annual Report</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="date-range">Date Range</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" placeholder="Start date" />
                        <Input type="date" placeholder="End date" />
                      </div>
                    </div>

                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Recent Reports</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">January 2024 Summary</p>
                          <p className="text-xs text-gray-500">Generated on Jan 31, 2024</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Q4 2023 Analysis</p>
                          <p className="text-xs text-gray-500">Generated on Dec 31, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
