import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Clock, Users, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Voice, <span className="text-accent">Our Priority</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A transparent, bias-free platform for students to raise grievances and track resolutions in real-time.
                Empowering students with accountability and trust.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Your Complaint
              </Button>
              <Button size="lg" variant="outline">
                Track Existing Complaint
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Transparent</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Reliable</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-card border-border">
              <img
                src="/college-students-in-modern-campus-discussing-with-.jpg"
                alt="Students engaging with college administration"
                className="w-full h-80 object-cover rounded-lg"
              />
            </Card>

            {/* Floating stats cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-background border-border shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Resolution Rate</div>
              </div>
            </Card>

            <Card className="absolute -bottom-4 -right-4 p-4 bg-background border-border shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24h</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
