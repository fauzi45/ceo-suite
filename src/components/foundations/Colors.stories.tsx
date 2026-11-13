import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const PALETTES: { name: string; token: string; steps: (number | string)[]; description: string }[] = [
  {
    name: "Primary",
    token: "primary",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    description: "Warna utama produk/brand. Dipakai untuk button, link, input.",
  },
  {
    name: "Secondary",
    token: "secondary",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    description: "Warna pendukung (oranye).",
  },
  {
    name: "Neutral",
    token: "neutral",
    steps: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000],
    description: "Teks, background, divider.",
  },
  {
    name: "Success",
    token: "success",
    steps: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    description: "Aksi positif, konfirmasi berhasil.",
  },
  {
    name: "Error",
    token: "error",
    steps: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    description: "Aksi destruktif/negatif.",
  },
  {
    name: "Warning",
    token: "warning",
    steps: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    description: "Pesan peringatan, status tugas.",
  },
];

function Swatch({ token, step }: { token: string; step: number | string }) {
  const varName = `--color-${token}-${step}`;
  return (
    <div className="flex w-[88px] flex-col gap-1">
      <div
        className="h-12 rounded-md border border-neutral-100"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <span className="text-caption font-medium text-neutral-900">{step}</span>
      <code className="text-tiny text-neutral-500">{token}-{step}</code>
    </div>
  );
}

function ColorsPage() {
  return (
    <div className="flex flex-col gap-10 p-6">
      {PALETTES.map((p) => (
        <section key={p.token} className="flex flex-col gap-3">
          <div>
            <h2 className="text-heading-sm font-bold text-neutral-1000">{p.name}</h2>
            <p className="text-caption text-neutral-500">{p.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {p.steps.map((s) => (
              <Swatch key={s} token={p.token} step={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta: Meta<typeof ColorsPage> = {
  title: "Foundations/Colors",
  component: ColorsPage,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Palette: StoryObj<typeof ColorsPage> = {};
