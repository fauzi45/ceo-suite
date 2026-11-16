import { cn } from "@/lib/cn";
import type { ServiceFeature } from "@/data/services";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface FeatureItemProps {
  feature: Pick<ServiceFeature, "icon" | "title" | "description">;
  className?: string;
}

/** Satu keunggulan: ikon dalam lingkaran merah muda (dengan lingkar tipis di luarnya), judul merah, dan deskripsi. */
export function FeatureItem({ feature, className }: FeatureItemProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span
        aria-hidden="true"
        className="m-3 inline-flex size-12 items-center justify-center rounded-full bg-primary-200 text-primary-800 shadow-[0_0_0_12px_#fff0f6] md:size-[60px]"
      >
        <Icon name={feature.icon} size={28} />
      </span>
      <h3 className="text-body font-bold leading-[1.2] text-primary-800">{feature.title}</h3>
      <p className="text-caption leading-[1.5] text-neutral-500">{feature.description}</p>
    </div>
  );
}
