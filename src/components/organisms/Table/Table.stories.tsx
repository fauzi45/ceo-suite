import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Table, type TableColumn } from "./Table";
import { StatusChip, RoomTypeChip, type ChipStatus, type RoomType } from "@/components/atoms/Chip/Chip";

interface BookingRow {
  id: string;
  customer: string;
  email: string;
  room: RoomType;
  date: string;
  status: ChipStatus;
}

const ROWS: BookingRow[] = [
  { id: "BK-1001", customer: "Olivia Rhye", email: "olivia@ceosuite.com", room: "meeting", date: "12 Nov 2026", status: "success" },
  { id: "BK-1002", customer: "Phoenix Baker", email: "phoenix@ceosuite.com", room: "office", date: "13 Nov 2026", status: "warning" },
  { id: "BK-1003", customer: "Lana Steiner", email: "lana@ceosuite.com", room: "board", date: "14 Nov 2026", status: "failed" },
  { id: "BK-1004", customer: "Demi Wilkinson", email: "demi@ceosuite.com", room: "coworking", date: "15 Nov 2026", status: "canceled" },
  { id: "BK-1005", customer: "Candice Wu", email: "candice@ceosuite.com", room: "seminar", date: "16 Nov 2026", status: "expired" },
];

const STATUS_LABEL: Record<ChipStatus, string> = {
  success: "Success",
  warning: "Unverified",
  failed: "Failed",
  canceled: "Canceled by Customer",
  expired: "Expired",
  superadmin: "Super Admin",
};

const COLUMNS: TableColumn<BookingRow>[] = [
  { key: "id", header: "Booking ID", className: "w-32 font-medium" },
  {
    key: "customer",
    header: "Customer",
    render: (r) => (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-900">{r.customer}</span>
        <span className="text-neutral-500">{r.email}</span>
      </div>
    ),
  },
  { key: "room", header: "Room", render: (r) => <RoomTypeChip roomType={r.room} /> },
  { key: "date", header: "Date" },
  { key: "status", header: "Status", render: (r) => <StatusChip status={r.status}>{STATUS_LABEL[r.status]}</StatusChip> },
];

const meta: Meta<typeof Table<BookingRow>> = {
  title: "Organisms/Table",
  component: Table,
  args: { columns: COLUMNS, rows: ROWS, onEdit: fn(), onDelete: fn() },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Table<BookingRow>>;

export const Default: Story = {};
export const WithoutActions: Story = { args: { onEdit: undefined, onDelete: undefined } };
export const Empty: Story = { args: { rows: [] } };

function Paginated() {
  const [page, setPage] = useState(1);
  return (
    <Table columns={COLUMNS} rows={ROWS} page={page} pageCount={10} onPageChange={setPage} onEdit={fn()} onDelete={fn()} />
  );
}

export const WithPagination: Story = {
  render: () => <Paginated />,
  parameters: { controls: { disable: true } },
};
