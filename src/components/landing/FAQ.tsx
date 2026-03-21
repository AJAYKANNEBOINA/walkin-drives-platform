import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is a walk-in drive?", a: "A walk-in drive is a recruitment event where candidates can directly visit the company's venue for an interview — no prior online application needed. Just bring your documents and walk in." },
  { q: "Is WALKINS free for job seekers?", a: "Yes, WALKINS is completely free for job seekers. You can search, RSVP, and attend any walk-in drive at no cost." },
  { q: "How do I know if a drive is verified?", a: "All drives on WALKINS are reviewed by our team. Verified drives have a blue 'Verified' badge, meaning we've confirmed the listing details with the hiring company." },
  { q: "What documents should I carry?", a: "Each drive listing includes a specific document checklist. Common items include your resume, government ID (Aadhaar/PAN), passport photos, educational certificates, and experience letters." },
  { q: "Can employers post drives for free?", a: "Yes, basic drive listings are free for employers. Premium features like featured placement and analytics dashboards are available on paid plans." },
  { q: "What cities are currently supported?", a: "WALKINS currently covers Hyderabad, Bangalore, Chennai, Pune, and Mumbai. We're expanding to more cities soon." },
];

const FAQ = () => (
  <section id="faq" className="py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about WALKINS.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border bg-card px-5">
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
