import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string) {
  if (!dateString) return 'Unknown date';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy • h:mm a');
  } catch (error) {
    return dateString;
  }
}
