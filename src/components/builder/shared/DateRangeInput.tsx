import { useState, useRef } from 'react';

interface DateRangeInputProps {
  dates: string;
  onChange: (dates: string) => void;
  namePrefix: string;
  error?: string;
  required?: boolean;
}

export default function DateRangeInput({ dates, onChange, namePrefix, error, required }: DateRangeInputProps) {
  const parse = (d: string) => {
    const parts = d.split(' - ');
    return { s: parts[0] || '', e: parts[1] || '' };
  };

  const { s: initStart, e: initEnd } = parse(dates);
  const [start, setStart] = useState(initStart);
  const [end, setEnd] = useState(initEnd);
  const [isPresent, setIsPresent] = useState(initEnd.toLowerCase() === 'present');
  const lastCommitted = useRef(dates);

  // Sync from prop when it changes externally (e.g. undo, reset, navigating back)
  if (dates !== lastCommitted.current) {
    const { s, e } = parse(dates);
    setStart(s);
    setEnd(e);
    setIsPresent(e.toLowerCase() === 'present');
    lastCommitted.current = dates;
  }

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
          <input
            name={`${namePrefix}-start`}
            type="text"
            value={start}
            onChange={(e) => { setStart(e.target.value); commit(e.target.value, end, isPresent); }}
            placeholder="MM/YYYY"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
          />
          <p className="mt-0.5 text-xs text-gray-400">Start date</p>
        </div>
        <div>
          <input
            name={`${namePrefix}-end`}
            type="text"
            value={isPresent ? 'Present' : end}
            onChange={(e) => { setEnd(e.target.value); commit(start, e.target.value, false); setIsPresent(false); }}
            disabled={isPresent}
            placeholder="MM/YYYY"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta disabled:bg-gray-100"
          />
          <label className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={isPresent}
              onChange={(e) => { setIsPresent(e.target.checked); setEnd(e.target.checked ? 'Present' : ''); commit(start, '', e.target.checked); }}
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
