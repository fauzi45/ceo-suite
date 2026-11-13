import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Modal } from "./Modal";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Organisms/Modal",
  component: Modal,
  args: {
    open: true,
    title: "Delete Customer?",
    description: "Are you sure you want to delete this data? This action cannot be undone.",
    onClose: fn(),
    onConfirm: fn(),
  },
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const DeleteConfirmation: Story = {};

export const Warning: Story = {
  args: {
    tone: "warning",
    title: "Unsaved changes",
    description: "You have unsaved changes. Leave this page anyway?",
    confirmLabel: "Leave",
    destructive: false,
  },
};

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8">
      <Button hierarchy="secondary-outline" destructive onClick={() => setOpen(true)}>
        Delete customer
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Delete Customer?"
        description="Are you sure you want to delete this data? This action cannot be undone."
      />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
