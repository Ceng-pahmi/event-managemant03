import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Separator } from "../../../../components/ui/separator"
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

// In a real application, this would come from a database or API
const events = [
  {
    id: 1,
    slug: "whisky-live-2025",
    title: "WHISKY LIVE JAKARTA 2025",
    date: "01 Feb - 02 Feb 2025",
    time: "11:00 AM - 9:00 PM",
    location: "Four Seasons Hotel Ballroom, Jakarta",
    price: 1500000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snap.PNG-0mLxxTS4dKpDOxFG64ZbMnBsdZD3YY.png",
    description:
      "Whisky Live is the biggest annual international whisky tasting event that unites whisky and spirits enthusiasts from around the world. Join us for an immersive experience in the world of fine whisky.",
  },

]

export function generateStaticParams() {
  return events.map(event => ({
    slug: event.slug,
  }));
}

export default function BookEvent() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const event = events.find((e) => e.slug === params.slug)

  if (!event) {
    return <div>Event not found</div>
  }

  const totalPrice = event.price * quantity

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Booking submitted", { name, email, quantity, totalPrice })
    router.push(`/events/${event.slug}/confirmation`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to event details
        </Link>

        <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="quantity">Number of Tickets</Label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price per Ticket</Label>
                <p className="text-lg font-semibold">Rp {event.price.toLocaleString()}</p>
              </div>
              <Separator />
              <div>
                <Label>Total Price</Label>
                <p className="text-2xl font-bold">Rp {totalPrice.toLocaleString()}</p>
              </div>
              <Button type="submit" className="w-full">
                Book Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
