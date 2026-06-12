const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getHello() {
  try {
    const res = await fetch(`${API_URL}/api/hello`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json() as Promise<{ message: string }>;
  } catch {
    return null;
  }
}

async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/api/users`, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return res.json() as Promise<Array<{ id: string; email: string; name?: string }>>;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const hello = await getHello();
  const users = await getUsers();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Public Portal</p>
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <p className="text-muted-foreground">
          Basic Next.js frontend connected to the NestJS API.
        </p>
      </header>

      <section className="rounded-lg border border-border p-6">
        <h2 className="mb-2 font-semibold">API status</h2>
        <p className="text-sm text-muted-foreground">
          {hello?.message ?? "API unreachable — start the backend with pnpm dev"}
        </p>
        <div className="mt-4 flex gap-2">
          <a
            href={`${API_URL}/health`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Health check
          </a>
          <a
            href={`${API_URL}/graphql`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium hover:bg-muted"
          >
            GraphQL playground
          </a>
        </div>
      </section>

      <section className="rounded-lg border border-border p-6">
        <h2 className="mb-4 font-semibold">Users ({users.length})</h2>
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {users.map((user) => (
              <li key={user.id} className="rounded-md bg-muted px-3 py-2">
                {user.name ?? user.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
