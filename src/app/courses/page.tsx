"use client";
import { useEffect, useState } from "react";

type Section = {
  id: string;
  number: string;
  days: string;
  start: string;
  end: string;
  instructor?: string | null;
};
type Course = {
  id: string;
  code: string;
  title: string;
  dept: string;
  sections: Section[];
};

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Course[]>([]);
  const [debounced, setDebounced] = useState("");

  // Debounce the query so we don't spam the API while typing
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 200);
    return () => clearTimeout(t);
  }, [q]);

  // Fetch from our API whenever debounced query changes
  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      try {
        const url =
          "/api/courses" + (debounced ? `?search=${encodeURIComponent(debounced)}` : "");
        const res = await fetch(url);
        const json = await res.json();
        if (!cancel) setData(json.courses || []);
      } catch (e) {
        if (!cancel) setData([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [debounced]);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Courses</h1>

      <div className="flex gap-2">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Search by code or title (e.g., 201 or CSCI)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {loading && <span className="self-center text-sm text-gray-500">Loading…</span>}
      </div>

      {data.length === 0 && !loading && (
        <p className="text-gray-500">No results yet. Try searching “201”.</p>
      )}

      <ul className="space-y-3">
        {data.map((c) => (
          <li key={c.id} className="border rounded p-3">
            <div className="font-medium">{c.code} — {c.title}</div>
            <div className="text-xs text-gray-500">Dept: {c.dept}</div>

            <div className="mt-2 grid sm:grid-cols-2 gap-2">
              {c.sections.map((s) => (
                <div key={s.id} className="text-sm border rounded p-2">
                  <div className="font-mono">{s.number}</div>
                  <div>{s.days} {s.start}–{s.end}</div>
                  <div className="text-xs text-gray-500">{s.instructor || "TBA"}</div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
