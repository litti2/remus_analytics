'use client';
import { Layout as Shell } from "@/components/Layout";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}
