import { ReactNode } from 'react';
import { cn } from '../../utils';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  copyText?: string;
  collapsible?: boolean;
}

export function ContentCard({ title, icon, children, className, copyText, collapsible = false }: CardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopy = () => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col", className)}>
      <div 
        className={cn("px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white transition-colors", collapsible && "cursor-pointer hover:bg-slate-50")}
        onClick={() => collapsible && setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 text-slate-800 font-medium">
          {icon}
          {title}
        </div>
        <div className="flex items-center gap-2">
          {copyText && (
            <button 
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-100"
              title="Copy content"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
          {collapsible && (
            <button className="text-slate-400 p-1.5 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-md">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      {expanded && (
        <div className="p-5 text-slate-700 text-sm leading-relaxed overflow-x-auto flex-1">
          {children}
        </div>
      )}
    </div>
  );
}
