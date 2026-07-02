import { getSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin — Motores Jordan" };

export default async function AdminLayout({ children }) {
  const session = await getSession();
  return <AdminShell user={session}>{children}</AdminShell>;
}
