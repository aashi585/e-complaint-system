"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

export function ProtectedRoute({ children, requiredRole = null }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not authenticated, redirect to login
        router.push("/login")
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // Wrong role, redirect to appropriate dashboard
        const roleRoutes = {
          student: "/student",
          coordinator: "/coordinator",
          hod: "/hod",
        }
        router.push(roleRoutes[user.role] || "/")
        return
      }
    }
  }, [user, isLoading, requiredRole, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated or wrong role
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  return children
}
