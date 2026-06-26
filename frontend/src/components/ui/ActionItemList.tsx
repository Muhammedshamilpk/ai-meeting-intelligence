import { ActionItem } from '../../types';

interface ActionItemListProps {
  items: ActionItem[];
}

export function ActionItemList({ items }: ActionItemListProps) {
  if (!items || items.length === 0) {
    return <p className="text-slate-500 italic">No action items detected.</p>;
  }

  return (
    <ul className="space-y-3 max-w-3xl">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="mt-0.5 w-5 h-5 rounded border-2 border-slate-300 bg-white flex-shrink-0 flex items-center justify-center text-white hover:border-blue-500 transition-colors cursor-pointer"></div>
          <div className="flex-1">
            <p className="text-slate-900 font-medium">{item.task}</p>
            <div className="flex items-center gap-4 mt-2 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-500">
                  {item.owner.charAt(0).toUpperCase()}
                </span>
                {item.owner}
              </span>
              <span className="text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">Due: {item.deadline}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
