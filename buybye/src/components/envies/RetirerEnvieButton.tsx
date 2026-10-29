import { retirerEnvie } from "@/actions/envie.actions";

export default function RetirerEnvieButton({ envieId }: { envieId: number }) {
  return (
    <form action={retirerEnvie}>
      <input type="hidden" name="id" value={envieId} />
      <button
        type="submit"
        className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        Retirer
      </button>
    </form>
  );
}
