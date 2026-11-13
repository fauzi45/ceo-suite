import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const SCALE = [
  { token: "display-lg", px: 61, cls: "text-display-lg" },
  { token: "display-md", px: 49, cls: "text-display-md" },
  { token: "display-sm", px: 39, cls: "text-display-sm" },
  { token: "heading-lg", px: 31, cls: "text-heading-lg" },
  { token: "heading-md", px: 25, cls: "text-heading-md" },
  { token: "heading-sm", px: 20, cls: "text-heading-sm" },
  { token: "body", px: 16, cls: "text-body" },
  { token: "caption", px: 13, cls: "text-caption" },
  { token: "tiny", px: 10, cls: "text-tiny" },
];

const WEIGHTS = [
  { label: "Regular", cls: "font-regular" },
  { label: "Medium", cls: "font-medium" },
  { label: "Bold", cls: "font-bold" },
];

function TypographyPage() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <section className="flex flex-col gap-2">
        <h2 className="text-heading-sm font-bold text-neutral-1000">Plus Jakarta Sans</h2>
        <p className="text-caption text-neutral-500">
          Basis 16px, rasio 1.25. Weight: Regular 400, Medium 500, Bold 700. Line height 120%.
        </p>
        <p className="text-display-md font-medium leading-[1.2] text-neutral-1000">Ag</p>
        <p className="text-body text-neutral-700">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p className="text-body text-neutral-700">abcdefghijklmnopqrstuvwxyz</p>
        <p className="text-body text-neutral-700">0123456789 !@#$%^&amp;*()</p>
      </section>

      <section className="grid grid-cols-[120px_1fr_1fr_1fr] items-baseline gap-x-6 gap-y-4">
        <span />
        {WEIGHTS.map((w) => (
          <span key={w.label} className="text-caption font-medium text-neutral-500">
            {w.label}
          </span>
        ))}
        {SCALE.map((s) => (
          <>
            <div key={s.token} className="flex flex-col">
              <code className="text-caption text-neutral-900">{s.cls}</code>
              <span className="text-tiny text-neutral-500">{s.px}px</span>
            </div>
            {WEIGHTS.map((w) => (
              <p
                key={`${s.token}-${w.label}`}
                className={`${s.cls} ${w.cls} truncate leading-[1.2] text-neutral-1000`}
              >
                Plus Jakarta Sans
              </p>
            ))}
          </>
        ))}
      </section>
    </div>
  );
}

const meta: Meta<typeof TypographyPage> = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Scale: StoryObj<typeof TypographyPage> = {};
