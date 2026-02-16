import { useState, useMemo } from "react";
import { verbCategories } from "../data/actionVerbs";

const categoryColors: Record<string, { bg: string; border: string; chip: string; chipActive: string }> = {
  "Creative": { bg: "bg-purple-50", border: "border-purple-200", chip: "bg-purple-100 text-purple-700", chipActive: "bg-purple-600 text-white" },
  "Manual Skills": { bg: "bg-orange-50", border: "border-orange-200", chip: "bg-orange-100 text-orange-700", chipActive: "bg-orange-600 text-white" },
  "Detail Oriented": { bg: "bg-cyan-50", border: "border-cyan-200", chip: "bg-cyan-100 text-cyan-700", chipActive: "bg-cyan-600 text-white" },
  "Financial": { bg: "bg-emerald-50", border: "border-emerald-200", chip: "bg-emerald-100 text-emerald-700", chipActive: "bg-emerald-600 text-white" },
  "Organizing": { bg: "bg-blue-50", border: "border-blue-200", chip: "bg-blue-100 text-blue-700", chipActive: "bg-blue-600 text-white" },
  "Providing Service": { bg: "bg-rose-50", border: "border-rose-200", chip: "bg-rose-100 text-rose-700", chipActive: "bg-rose-600 text-white" },
  "Leadership": { bg: "bg-amber-50", border: "border-amber-200", chip: "bg-amber-100 text-amber-700", chipActive: "bg-amber-600 text-white" },
  "Research & Investigation": { bg: "bg-indigo-50", border: "border-indigo-200", chip: "bg-indigo-100 text-indigo-700", chipActive: "bg-indigo-600 text-white" },
  "Technical": { bg: "bg-slate-50", border: "border-slate-200", chip: "bg-slate-100 text-slate-700", chipActive: "bg-slate-600 text-white" },
  "Teaching": { bg: "bg-teal-50", border: "border-teal-200", chip: "bg-teal-100 text-teal-700", chipActive: "bg-teal-600 text-white" },
  "Communication": { bg: "bg-pink-50", border: "border-pink-200", chip: "bg-pink-100 text-pink-700", chipActive: "bg-pink-600 text-white" },
};

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-amber-200 rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function ActionVerbBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(verbCategories.map((c) => c.name))
  );

  const toggleCategory = (name: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return verbCategories
      .filter((cat) => activeCategories.has(cat.name))
      .map((cat) => ({
        ...cat,
        verbs: q
          ? cat.verbs.filter((v) => v.toLowerCase().includes(q))
          : cat.verbs,
      }))
      .filter((cat) => cat.verbs.length > 0);
  }, [searchQuery, activeCategories]);

  const totalCount = useMemo(
    () => filtered.reduce((sum, cat) => sum + cat.verbs.length, 0),
    [filtered]
  );

  const categoryMatchCounts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const counts: Record<string, number> = {};
    for (const cat of verbCategories) {
      counts[cat.name] = q
        ? cat.verbs.filter((v) => v.toLowerCase().includes(q)).length
        : cat.verbs.length;
    }
    return counts;
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search action verbs..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {verbCategories.map((cat) => {
          const colors = categoryColors[cat.name];
          const isActive = activeCategories.has(cat.name);
          const count = categoryMatchCounts[cat.name];
          return (
            <button
              key={cat.name}
              onClick={() => toggleCategory(cat.name)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                isActive ? colors?.chipActive : "bg-gray-100 text-gray-400 line-through"
              }`}
            >
              {cat.name}
              <span
                className={`inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[10px] font-semibold ${
                  isActive ? "bg-white/25" : "bg-gray-200 text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        {totalCount} verb{totalCount !== 1 ? "s" : ""} found
        {searchQuery && (
          <span>
            {" "}matching "<span className="font-medium text-gray-700">{searchQuery}</span>"
          </span>
        )}
      </p>

      {/* Verb Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="text-lg font-medium">No matching verbs found</p>
          <p className="text-sm mt-1">Try adjusting your search or enabling more categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cat) => {
            const colors = categoryColors[cat.name];
            return (
              <div
                key={cat.name}
                className={`rounded-lg border ${colors?.border ?? "border-gray-200"} overflow-hidden`}
              >
                <div className={`px-4 py-2.5 ${colors?.bg ?? "bg-gray-50"} border-b ${colors?.border ?? "border-gray-200"}`}>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {cat.name}
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      ({cat.verbs.length})
                    </span>
                  </h3>
                </div>
                <div className="p-3 flex flex-wrap gap-1.5">
                  {cat.verbs.map((verb) => (
                    <span
                      key={verb}
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${colors?.chip ?? "bg-gray-100 text-gray-700"} hover:opacity-80 transition-opacity cursor-default`}
                    >
                      <HighlightedText text={verb} query={searchQuery} />
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
