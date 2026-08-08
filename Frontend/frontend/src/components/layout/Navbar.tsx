import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-zinc-900"
        >
          EventNest
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/events"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
          >
            Events
          </Link>

          <Link
            href="/bookings"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
          >
            My Bookings
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
