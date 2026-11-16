import type { Metadata } from "next";
import { MyBookingListContent } from "./MyBookingListContent";

export const metadata: Metadata = { title: "My Bookings | CEO SUITE" };

export default function MyBookingPage() {
  return <MyBookingListContent />;
}
