"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, User, Users, Shield, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    studentId: "",
    department: "Computer Science",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!loginData.email || !loginData.password || !loginData.role) {
        throw new Error("Please fill in all fields")
      }

      // Mock authentication - in real app, this would be an API call
      const mockUsers = {
        "student@college.edu": { role: "student", name: "Aashi" },
        "coordinator@college.edu": { role: "coordinator", name: "Miss Annu Yadav" },
        "hod@college.edu": { role: "hod", name: "Dr Sachin Malhotra" },
      }

      const user = mockUsers[loginData.email]
      if (!user || user.role !== loginData.role) {
        throw new Error("Invalid credentials or role mismatch")
      }

      // Store user data (in real app, use proper auth tokens)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect based on role
      const roleRoutes = {
        student: "/student",
        coordinator: "/coordinator",
        hod: "/hod",
      }

      router.push(roleRoutes[loginData.role])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate form
      if (!registerData.name || !registerData.email || !registerData.password || !registerData.role) {
        throw new Error("Please fill in all required fields")
      }

      if (registerData.password !== registerData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (registerData.password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      if (registerData.role === "student" && !registerData.studentId) {
        throw new Error("Student ID is required for student registration")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration success
      alert("Registration successful! Please login with your credentials.")

      // Reset form
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        studentId: "",
        department: "Computer Science",
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <User className="h-4 w-4" />
      case "coordinator":
        return <Users className="h-4 w-4" />
      case "hod":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <FileText className="h-10 w-10 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">E-Complaint System</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Access Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your portal or create a new account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Auth Forms */}
        <Card>
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-role">Select Your Role</Label>
                    <Select
                      value={loginData.role}
                      onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Student</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="coordinator">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>Class Coordinator</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="hod">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Head of Department</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                    {loginData.role && getRoleIcon(loginData.role)}
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-blue-800 mb-2">Demo Credentials:</p>
                  <div className="text-xs text-blue-700 space-y-1">
                    <div>Student: student@college.edu</div>
                    <div>Coordinator: coordinator@college.edu</div>
                    <div>HOD: hod@college.edu</div>
                    <div className="font-medium">Password: demo123</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-role">Role</Label>
                    <Select
                      value={registerData.role}
                      onValueChange={(value) => setRegisterData({ ...registerData, role: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="coordinator">Class Coordinator</SelectItem>
                        <SelectItem value="hod">Head of Department</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {registerData.role === "student" && (
                    <div className="space-y-2">
                      <Label htmlFor="register-student-id">Student ID</Label>
                      <Input
                        id="register-student-id"
                        type="text"
                        placeholder="Enter your student ID"
                        value={registerData.studentId}
                        onChange={(e) => setRegisterData({ ...registerData, studentId: e.target.value })}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email Address</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
