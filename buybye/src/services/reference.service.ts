import { categories, familles, typesProduit } from "@/lib/mocks";

export function lireReferences() {
  return { familles, categories, types: typesProduit };
}
