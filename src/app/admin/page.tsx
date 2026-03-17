import { Metadata } from "next";
import AdminClient from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Administration",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminClient />;
}
