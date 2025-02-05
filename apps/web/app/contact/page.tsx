"use client";

import { MainNav } from "../../components/main-nav";
import { Footer } from "../../components/footer";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function Contact() {
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNav />

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <Card className="p-6">
            <form className="flex flex-col gap-4">
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <textarea
                className="w-full p-2 border border-black-300 rounded-md bg-background"
                placeholder="Your Message"
                required
              />
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
