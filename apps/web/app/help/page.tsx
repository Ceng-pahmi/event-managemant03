import { Footer } from '../../components/footer';
import { MainNav } from '../../components/main-nav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';

export default function HelpPage() {

  return (
    <div>
      <MainNav  />
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Help Center</h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an event?</AccordionTrigger>
              <AccordionContent>
                To create an event, click on the "Create Events" button in the navigation menu. Fill out the event details including title, description, date, location, and category. Once you've filled out all required information, click "Create Event" to publish your event.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I purchase tickets?</AccordionTrigger>
              <AccordionContent>
                To purchase tickets, browse events and click on the event you're interested in. On the event page, select the number of tickets you want and click "Purchase Tickets". Follow the checkout process to complete your purchase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What's your refund policy?</AccordionTrigger>
              <AccordionContent>
                Refund policies may vary by event. Generally, refunds are available up to 24 hours before the event starts. Check the specific event's details for their refund policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}
