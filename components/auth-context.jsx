"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // Mock authentication - replace with real API call
      const mockUsers = {
        "student@college.edu": {
          role: "student",
          name: "Aashi",
          email: "student@college.edu",
          studentId: "2021CS001",
        },
        "coordinator@college.edu": {
          role: "coordinator",
          name: "Miss Annu Yadav",
          email: "coordinator@college.edu",
          department: "Computer Science",
        },
        "hod@college.edu": {
          role: "hod",
          name: "Dr Sachin Malhotra",
          email: "hod@college.edu",
          department: "Computer Science",
        },
      }

      const userData = mockUsers[credentials.email]
      if (!userData || userData.role !== credentials.role) {
        throw new Error("Invalid credentials or role mismatch")
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      return userData
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const isAuthenticated = () => {
    return !!user
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
