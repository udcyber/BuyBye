export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-1 px-4 py-4 text-sm text-slate-500 sm:flex-row">
        <p>
          <span className="font-semibold text-emerald-700">BuyBye</span> –
          Consommez mieux, dépensez juste.
        </p>
        <p>© {new Date().getFullYear()} BuyBye</p>
      </div>
    </footer>
  );
}