"use client";

export function TestApiButton() {
  return (
    <button
      onClick={async () => {
        const res = await fetch("/api/test");
        const data = await res.json();
        alert(data.message);
      }}
    >
      Tester l'API
    </button>
  );
}
