export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} EventNest. All rights reserved.
        </p>

        <p className="text-sm text-zinc-500">
          Discover. Book. Experience.
        </p>
      </div>
    </footer>
  );
}

