import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a 1-second animation duration
  }, []);

  return (
    <div className="p-[65px]">
      <div className="flex flex-col container  mx-auto my-20 md:flex-row justify-between gap-5 bg-[#F1F5F9] rounded-lg rounded-b-3xl py-8 px-6">
      {/* Left section with title and description */}
      <div className="md:w-1/2 p-5" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-md font-normal mb-12">
          Below are answers to some common questions. If you need more help,
          feel free to{" "}
          <a
            href="mailto:support@flowmate.com"
            className="text-blue-600 underline"
          >
            email us
          </a>
          .
        </p>
        <img src="" alt="" />
      </div>

      {/* Accordion FAQ section with light background and rounded edges */}
      <Accordion
        type="single"
        collapsible
        className="w-full md:w-1/2 space-y-4  rounded-tl-lg rounded-br-lg p-5"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Accordion items with borders and paddings */}
        <AccordionItem
          value="item-1"
          className="border  rounded-md p-4 hover:shadow-lg"
        >
          <AccordionTrigger className="font-semibold">
            How do I get started with FlowMate?
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            Sign up with your email or Google account. Once registered, you can
            create your first project, invite team members, and start managing
            tasks instantly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="border  rounded-md p-4 hover:shadow-lg"
        >
          <AccordionTrigger className="font-semibold">
            Can I integrate FlowMate with other tools?
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            Yes, FlowMate integrates with tools like Google Calendar, Slack, and
            more, helping you sync workflows and enhance team collaboration.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="border  rounded-md p-4 hover:shadow-lg"
        >
          <AccordionTrigger className="font-semibold">
            Is my data secure on FlowMate?
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            Absolutely. We use industry-standard encryption and secure
            authentication to ensure your data is safe and accessible only to
            authorized users.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    </div>
  );
}
