import type { ReactNode } from 'react';

interface DynamicListProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel?: string;
}

export default function DynamicList<T>({
  items,
  onAdd,
  onRemove,
  renderItem,
  addLabel = 'Add item',
}: DynamicListProps<T>) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="relative group">
          <div className="pr-8">{renderItem(item, index)}</div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
}
