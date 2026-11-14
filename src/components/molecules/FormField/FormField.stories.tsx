import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    leadingIcon: "mail",
  },
  decorators: [(Story) => <div className="w-[375px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: "Input" } };
export const Error: Story = { args: { errorText: "Helper text", defaultValue: "Input" } };
export const Disabled: Story = { args: { disabled: true } };
/** Field wajib: tanda `*` merah di label (disembunyikan dari screen reader, input `required`). */
export const Required: Story = { args: { required: true } };

/** Semua state "Input / Box" di Figma: default, filled, error, disabled. */
export const Matrix: Story = {
  render: (args) => (
    <div className="grid w-[800px] grid-cols-2 gap-6">
      <FormField {...args} />
      <FormField {...args} defaultValue="Input" />
      <FormField {...args} errorText="Helper text" />
      <FormField {...args} disabled />
    </div>
  ),
  decorators: [(Story) => <Story />],
  parameters: { controls: { disable: true } },
};
