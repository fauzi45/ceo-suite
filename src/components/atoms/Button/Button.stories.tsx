import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button, type ButtonHierarchy } from "./Button";

const HIERARCHIES: ButtonHierarchy[] = [
  "primary",
  "secondary-outline",
  "secondary-filled",
  "secondary-white",
  "tertiary",
];

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Button",
    hierarchy: "primary",
    size: "desktop",
    iconLeft: "plus",
    iconRight: "plus",
    onClick: fn(),
  },
  argTypes: {
    hierarchy: { control: "select", options: HIERARCHIES },
    size: { control: "radio", options: ["desktop", "mobile"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Primary: Story = { args: { hierarchy: "primary" } };
export const SecondaryOutline: Story = { args: { hierarchy: "secondary-outline" } };
export const SecondaryFilled: Story = { args: { hierarchy: "secondary-filled" } };
export const SecondaryWhite: Story = { args: { hierarchy: "secondary-white" } };
export const Tertiary: Story = { args: { hierarchy: "tertiary" } };
export const Mobile: Story = { args: { size: "mobile" } };
export const Disabled: Story = { args: { disabled: true } };
export const Destructive: Story = {
  args: { hierarchy: "secondary-outline", destructive: true, children: "Delete", iconLeft: undefined, iconRight: undefined },
};

/** Semua hierarchy x state, seperti component set "button" di Figma. */
export const Matrix: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {(["desktop", "mobile"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-3">
          <p className="text-caption font-medium text-neutral-500">{size}</p>
          <div className="grid grid-cols-5 gap-4">
            {HIERARCHIES.map((h) => (
              <Button key={h} {...args} hierarchy={h} size={size} />
            ))}
            {HIERARCHIES.map((h) => (
              <Button key={`${h}-disabled`} {...args} hierarchy={h} size={size} disabled />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
