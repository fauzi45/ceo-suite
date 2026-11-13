import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, ICON_NAMES } from "@/components/atoms/Icon/Icon";

function IconsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-heading-sm font-bold text-neutral-1000">Icons</h2>
        <p className="text-caption text-neutral-500">
          SVG dari Iconify (nama layer di Figma) di <code>public/icons/</code>, dirender lewat CSS
          mask sehingga warnanya mengikuti <code>currentColor</code>.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
        {ICON_NAMES.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-lg border border-neutral-100 p-3 text-neutral-900"
          >
            <Icon name={name} size={24} />
            <code className="text-tiny text-neutral-500">{name}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof IconsPage> = {
  title: "Foundations/Icons",
  component: IconsPage,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const All: StoryObj<typeof IconsPage> = {};
