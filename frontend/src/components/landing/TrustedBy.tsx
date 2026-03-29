import { companies } from "@/data/mockData";

const TrustedBy = () => (
  <section className="border-b border-border bg-secondary/50 py-10">
    <div className="container">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Walk-in drives from leading companies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {companies.map(name => (
          <span key={name} className="text-lg font-bold text-muted-foreground/40 transition-colors hover:text-muted-foreground/70">
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy;
