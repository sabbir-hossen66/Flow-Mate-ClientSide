import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "./Container";

export function FAQ() {
  return (
    <Container className="flex flex-col max-w-6xl mx-auto my-20 md:flex-row justify-between gap-5">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-md font-normal mb-12">
          Here are some of our FAQs. If you have any other questions you’d like
          answered, please feel free to email us.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I get started with FlowMate?</AccordionTrigger>
          <AccordionContent>
            To get started, simply sign up for an account using your email or Google Sign-In. Once registered, you can create your first project, invite team members, and start organizing tasks right away.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I integrate FlowMate with other tools?</AccordionTrigger>
          <AccordionContent>
            Yes, FlowMate supports integration with various third-party tools like Google Calendar, Slack, and more to streamline your workflow and enhance collaboration within your team.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is my data secure on FlowMate?</AccordionTrigger>
          <AccordionContent>
            Absolutely. FlowMate uses industry-standard encryption and secure authentication protocols to protect your data. Your information is kept private and is only accessible to authorized team members.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
