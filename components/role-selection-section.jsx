"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Users, Shield, ArrowRight, FileText, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

export function RoleSelectionSection() {
  const roles = [
    {
      id: "student",
      title: "Student Portal",
      description: "Submit and track your complaints with ease",
      icon: User,
      features: ["Submit new complaints", "Track complaint status", "View complaint history", "Receive updates"],
      href: "/student",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "coordinator",
      title: "Class Coordinator",
      description: "Manage complaints from your assigned class",
      icon: Users,
      features: ["Review class complaints", "Update complaint status", "Assign to departments", "Monitor progress"],
      href: "/coordinator",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "hod",
      title: "Head of Department",
      description: "Oversee department-wide complaint management",
      icon: Shield,
      features: ["Department overview", "Handle escalations", "Generate reports", "Policy management"],
      href: "/hod",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Your Portal</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and manage complaints efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon
            return (
              <Card key={role.id} className={`transition-all duration-300 ${role.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-sm">
                    <IconComponent className={`h-8 w-8 ${role.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{role.title}</CardTitle>
                  <CardDescription className="text-gray-600">{role.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${role.iconColor.replace("text-", "bg-")}`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={role.href} className="block">
                    <Button className={`w-full ${role.buttonColor} text-white`}>
                      Access Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">500+</span>
            </div>
            <p className="text-sm text-gray-600">Complaints Resolved</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">95%</span>
            </div>
            <p className="text-sm text-gray-600">Satisfaction Rate</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Settings className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">24/7</span>
            </div>
            <p className="text-sm text-gray-600">System Availability</p>
          </div>
        </div>
      </div>
    </section>
  )
}
