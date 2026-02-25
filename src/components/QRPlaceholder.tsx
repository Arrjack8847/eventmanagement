import { cn } from "@/lib/utils";

export function QRPlaceholder({ ticketId, size = 160, className }: { ticketId: string; size?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="bg-foreground rounded-lg flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 100 100" className="text-background">
          {/* Simplified QR-like pattern */}
          <rect x="5" y="5" width="25" height="25" fill="currentColor" />
          <rect x="70" y="5" width="25" height="25" fill="currentColor" />
          <rect x="5" y="70" width="25" height="25" fill="currentColor" />
          <rect x="10" y="10" width="15" height="15" fill="hsl(var(--foreground))" />
          <rect x="75" y="10" width="15" height="15" fill="hsl(var(--foreground))" />
          <rect x="10" y="75" width="15" height="15" fill="hsl(var(--foreground))" />
          <rect x="14" y="14" width="7" height="7" fill="currentColor" />
          <rect x="79" y="14" width="7" height="7" fill="currentColor" />
          <rect x="14" y="79" width="7" height="7" fill="currentColor" />
          {/* data pattern */}
          <rect x="35" y="5" width="5" height="5" fill="currentColor" />
          <rect x="45" y="5" width="5" height="5" fill="currentColor" />
          <rect x="55" y="5" width="5" height="5" fill="currentColor" />
          <rect x="35" y="15" width="5" height="5" fill="currentColor" />
          <rect x="50" y="15" width="5" height="5" fill="currentColor" />
          <rect x="35" y="35" width="5" height="5" fill="currentColor" />
          <rect x="45" y="40" width="5" height="5" fill="currentColor" />
          <rect x="55" y="35" width="5" height="5" fill="currentColor" />
          <rect x="40" y="50" width="5" height="5" fill="currentColor" />
          <rect x="55" y="50" width="5" height="5" fill="currentColor" />
          <rect x="70" y="40" width="5" height="5" fill="currentColor" />
          <rect x="80" y="40" width="5" height="5" fill="currentColor" />
          <rect x="90" y="50" width="5" height="5" fill="currentColor" />
          <rect x="70" y="55" width="5" height="5" fill="currentColor" />
          <rect x="85" y="60" width="5" height="5" fill="currentColor" />
          <rect x="70" y="70" width="5" height="5" fill="currentColor" />
          <rect x="80" y="80" width="5" height="5" fill="currentColor" />
          <rect x="90" y="90" width="5" height="5" fill="currentColor" />
          <rect x="40" y="60" width="5" height="5" fill="currentColor" />
          <rect x="50" y="70" width="5" height="5" fill="currentColor" />
          <rect x="60" y="80" width="5" height="5" fill="currentColor" />
          <rect x="5" y="40" width="5" height="5" fill="currentColor" />
          <rect x="15" y="50" width="5" height="5" fill="currentColor" />
          <rect x="25" y="45" width="5" height="5" fill="currentColor" />
          <rect x="5" y="55" width="5" height="5" fill="currentColor" />
          <rect x="20" y="60" width="5" height="5" fill="currentColor" />
        </svg>
      </div>
      <span className="text-xs font-mono text-muted-foreground">{ticketId}</span>
    </div>
  );
}
