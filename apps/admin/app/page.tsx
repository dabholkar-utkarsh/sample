"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function AdminPage() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function checkHealth() {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`${API_URL}/health`);
      const data = await res.json();
      setStatus(JSON.stringify(data, null, 2));
    } catch {
      setStatus("Failed to reach API");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Internal Admin</p>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Minimal admin panel for the API.</p>
      </header>

      <section className="rounded-lg border border-border p-6">
        <h2 className="mb-4 font-semibold">Operations</h2>
        <Button onClick={checkHealth} disabled={loading}>
          {loading ? "Checking..." : "Ping API health"}
        </Button>
        {status && (
          <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-4 text-xs">{status}</pre>
        )}
      </section>

      <section className="rounded-lg border border-border p-6 text-sm text-muted-foreground">
        <p>API URL: {API_URL}</p>
        <p className="mt-2">Clerk, BullMQ, S3, Resend, and Anthropic are wired in the backend for later use.</p>
      </section>
    </main>
  );
}
