import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  const stats = [
    {
      number: "5,000+",
      label: "Students Served",
      description: "Active users across multiple departments",
    },
    {
      number: "98%",
      label: "Resolution Rate",
      description: "Complaints successfully resolved",
    },
    {
      number: "24hrs",
      label: "Average Response",
      description: "Time to first department response",
    },
    {
      number: "100%",
      label: "Transparency",
      description: "Complete audit trail for all complaints",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Trusted by Students Nationwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our commitment to transparency and efficiency has earned the trust of thousands of students and
            institutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-card border-border">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-card-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-lg p-8 border border-border">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Ready to Make Your Voice Heard?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of students who have successfully resolved their grievances through our transparent and
                efficient platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Get Started Today
                </button>
                <button className="border border-border text-card-foreground px-6 py-3 rounded-lg hover:bg-muted/50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div>
              <img
                src="/diverse-group-of-college-students-smiling-and-hold.jpg"
                alt="Happy college students"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
