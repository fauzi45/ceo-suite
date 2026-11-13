import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  StatusChip,
  RoomTypeChip,
  FilterChip,
  ROOM_TYPE_LABELS,
  type ChipStatus,
  type RoomType,
} from "./Chip";

const STATUSES: { status: ChipStatus; label: string }[] = [
  { status: "failed", label: "Failed" },
  { status: "expired", label: "Expired" },
  { status: "success", label: "Success" },
  { status: "canceled", label: "Canceled by Customer" },
  { status: "warning", label: "Unverified" },
  { status: "superadmin", label: "Super Admin" },
];

const meta: Meta<typeof StatusChip> = {
  title: "Atoms/Chip",
  component: StatusChip,
  args: { status: "success", children: "Success" },
  argTypes: { status: { control: "select", options: STATUSES.map((s) => s.status) } },
};
export default meta;

type Story = StoryObj<typeof StatusChip>;

export const Status: Story = {};

/** "chips/dashboard" di Figma. */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {STATUSES.map((s) => (
        <StatusChip key={s.status} status={s.status}>
          {s.label}
        </StatusChip>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/** "chips/office type" di Figma: dua ukuran, sembilan tipe ruangan. */
export const RoomTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["mobile-card", "desktop-card"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-caption font-medium text-neutral-500">{size}</p>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(ROOM_TYPE_LABELS) as RoomType[]).map((rt) => (
              <RoomTypeChip key={rt} roomType={rt} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

function FilterDemo() {
  const [selected, setSelected] = useState("all");
  const items = ["all", "today", "this-week", "this-month"];
  return (
    <div className="flex flex-col gap-6">
      {(["desktop", "mobile"] as const).map((size) => (
        <div key={size} className="flex flex-wrap gap-3">
          {items.map((id) => (
            <FilterChip key={id} size={size} selected={selected === id} onClick={() => setSelected(id)}>
              {id === "all" ? "Filter Item" : id.replace("-", " ")}
            </FilterChip>
          ))}
        </div>
      ))}
    </div>
  );
}

/** "filter item" di Figma: on/off x desktop/mobile. */
export const Filter: Story = {
  render: () => <FilterDemo />,
  parameters: { controls: { disable: true } },
};
