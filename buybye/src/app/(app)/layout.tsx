import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { lireSession } from "@/actions/auth.actions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const utilisateur = await lireSession();
  if (!utilisateur) {
    redirect("/connexion");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
