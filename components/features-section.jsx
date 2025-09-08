import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, Bell, BarChart3, Users, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Easy Submission",
      description:
        "Submit complaints with detailed descriptions, categories, and file attachments through our intuitive interface.",
    },
    {
      icon: Eye,
      title: "Real-time Tracking",
      description:
        "Track your complaint status from submission to resolution with complete transparency and audit trails.",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Receive immediate updates via email, SMS, and push notifications at every step of the process.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive dashboards for coordinators and departments to manage and analyze complaint patterns.",
    },
    {
      icon: Users,
      title: "Multi-Role System",
      description: "Structured workflow with student, coordinator, and department modules for efficient processing.",
    },
    {
      icon: Shield,
      title: "Bias-Free Process",
      description: "Transparent system with no rejection capabilities, ensuring every complaint is properly addressed.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Comprehensive Complaint Management</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the tools needed for transparent, efficient, and fair grievance resolution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <img
            src="/modern-college-campus-with-students-using-laptops-.jpg"
            alt="Students using digital services on campus"
            className="w-full max-w-4xl mx-auto h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
