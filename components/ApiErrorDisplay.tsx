import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface ApiErrorDisplayProps {
  error: string;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Shared error display component for API key configuration errors.
 * Matches the design pattern used in IntentValidatorDemo.
 */
export const ApiErrorDisplay: React.FC<ApiErrorDisplayProps> = ({ error, onDismiss, className = '' }) => {
  return (
    <div className={`h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000 p-8 ${className}`}>
      <div className="flex flex-col items-center gap-6 max-w-lg">
        <div className="relative group">
          <div className="absolute inset-0 bg-red-500/10 blur-[60px] animate-pulse rounded-full" />
          <AlertOctagon className="w-20 h-20 text-red-500 relative z-10" strokeWidth={1.5} />
        </div>
        <div className="space-y-4 relative z-10">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-[0.4em]">Configuration Error</h3>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">API_KEY_NOT_CONFIGURED</p>
          </div>
          <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3">
            <p className="text-xs md:text-sm text-zinc-300 font-medium leading-relaxed">{error}</p>
            <div className="pt-2 border-t border-red-500/10">
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Solution: Set API_KEY in .env or environment variables</p>
            </div>
          </div>
          {onDismiss && (
            <button 
              onClick={onDismiss} 
              className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-all"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
