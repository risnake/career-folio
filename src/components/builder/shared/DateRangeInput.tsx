import { useEffect, useRef, useState } from 'react';

interface DateRangeInputProps {
  dates: string;
  onChange: (dates: string) => void;
  namePrefix: string;
  error?: string;
  required?: boolean;
}

export default function DateRangeInput({ dates, onChange, namePrefix, error, required }: DateRangeInputProps) {
  const parse = (d: string) => {
    if (!d) return { s: '', e: '' };
    const parts = d.split(/\s*(?:-|–|—|to|through|until)\s*/i).filter(Boolean);
    const [start, end] = parts;
    return { s: start || '', e: end || '' };
  };
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const pastYearSpan = 80;
  const futureYearSpan = 5;
  const yearOptions = Array.from(
    { length: pastYearSpan + futureYearSpan + 1 },
    (_, i) => currentYear + futureYearSpan - i,
  );
  const parseYear = (val: string) => {
    const match = val.match(/(\d{4})/);
    return match ? Number(match[1]) : undefined;
  };
  const formatMonthYear = (month: number, year: number) => `${String(month).padStart(2, '0')}/${year}`;

  const { s: initStart, e: initEnd } = parse(dates);
  const [start, setStart] = useState(initStart);
  const [end, setEnd] = useState(initEnd);
  const [isPresent, setIsPresent] = useState(initEnd.toLowerCase() === 'present');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startYear, setStartYear] = useState(parseYear(initStart) ?? currentYear);
  const [endYear, setEndYear] = useState(parseYear(initEnd) ?? currentYear);
  const lastCommitted = useRef(dates);

  useEffect(() => {
    if (dates === lastCommitted.current) return;
    const { s, e } = parse(dates);
    setStart(s);
    setEnd(e);
    setIsPresent(e.toLowerCase() === 'present');
    setStartYear(parseYear(s) ?? currentYear);
    setEndYear(parseYear(e) ?? currentYear);
    lastCommitted.current = dates;
  }, [dates, currentYear]);

  const commit = (s: string, e: string, present: boolean) => {
    const endVal = present ? 'Present' : e;
    let combined: string;
    if (s && endVal) {
      combined = `${s} - ${endVal}`;
    } else if (s) {
      combined = s;
    } else {
      combined = '';
    }
    lastCommitted.current = combined;
    onChange(combined);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Dates{required ? ' *' : ''}
      </label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="relative">
            <div className="flex items-center gap-2">
              <input
                name={`${namePrefix}-start`}
                type="text"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                  const parsedYear = parseYear(e.target.value);
                  if (parsedYear) setStartYear(parsedYear);
                  commit(e.target.value, end, isPresent);
                }}
                placeholder="MM/YYYY"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => { setShowStartPicker((open) => !open); setShowEndPicker(false); }}
                className="shrink-0 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-700"
                aria-label="Pick start month and year"
              >
                📅
              </button>
            </div>
            {showStartPicker && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-gray-600">Start month/year</span>
                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-xs"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2">
                  {monthLabels.map((label, idx) => {
                    const monthNum = idx + 1;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          const formatted = formatMonthYear(monthNum, startYear);
                          setStart(formatted);
                          commit(formatted, end, isPresent);
                          setShowStartPicker(false);
                        }}
                        className="rounded border border-gray-200 px-2 py-2 text-xs text-gray-700 hover:border-blue-400 hover:text-blue-700"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-400">Start date</p>
        </div>
        <div>
          <div className="relative">
            <div className="flex items-center gap-2">
              <input
                name={`${namePrefix}-end`}
                type="text"
                value={isPresent ? 'Present' : end}
                onChange={(e) => {
                  setEnd(e.target.value);
                  const parsedYear = parseYear(e.target.value);
                  if (parsedYear) setEndYear(parsedYear);
                  commit(start, e.target.value, false);
                  setIsPresent(false);
                }}
                disabled={isPresent}
                placeholder="MM/YYYY"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => { if (!isPresent) { setShowEndPicker((open) => !open); setShowStartPicker(false); } }}
                className="shrink-0 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-700 disabled:cursor-not-allowed disabled:bg-gray-100"
                aria-label="Pick end month and year"
                disabled={isPresent}
              >
                📅
              </button>
            </div>
            {showEndPicker && !isPresent && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-gray-600">End month/year</span>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-xs"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2">
                  {monthLabels.map((label, idx) => {
                    const monthNum = idx + 1;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          const formatted = formatMonthYear(monthNum, endYear);
                          setEnd(formatted);
                          commit(start, formatted, false);
                          setShowEndPicker(false);
                        }}
                        className="rounded border border-gray-200 px-2 py-2 text-xs text-gray-700 hover:border-blue-400 hover:text-blue-700"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <label className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={isPresent}
              onChange={(e) => {
                setIsPresent(e.target.checked);
                setShowEndPicker(false);
                setEnd(e.target.checked ? 'Present' : '');
                commit(start, '', e.target.checked);
              }}
              className="rounded border-gray-300"
            />
            Present
          </label>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
