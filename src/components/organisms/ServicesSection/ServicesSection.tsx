import { cn } from "@/lib/cn";
import { SERVICES, type Service } from "@/data/services";
import { Container } from "@/components/atoms/Container/Container";
import { ServiceCard } from "@/components/molecules/ServiceCard/ServiceCard";

export interface ServicesSectionProps {
  id?: string;
  services?: Service[];
  className?: string;
}

/** "Our Services": judul tengah dengan garis merah di atasnya, lalu grid kartu layanan (3 kolom di desktop). */
export function ServicesSection({ id = "our-services", services = SERVICES, className }: ServicesSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-4 py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-primary-800" />
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">Our Services</h2>
          <p className="max-w-xl text-caption text-neutral-500 md:text-body">
            We provide hassle-free, on-demand services so you are free to fully focus on your business. Whatever your
            needs are, we&apos;ve got you covered.
          </p>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
