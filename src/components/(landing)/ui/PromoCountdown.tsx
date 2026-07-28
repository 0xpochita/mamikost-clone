"use client";

import { useEffect, useState } from "react";

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86_400;
const PLACEHOLDER = "--";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function endOfCurrentMonth(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
}

function remainingUntil(target: number): Remaining {
  const totalSeconds = Math.max(
    0,
    Math.floor((target - Date.now()) / MS_PER_SECOND),
  );
  return {
    days: Math.floor(totalSeconds / SECONDS_PER_DAY),
    hours: Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR),
    minutes: Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE),
    seconds: totalSeconds % SECONDS_PER_MINUTE,
  };
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

function Cell({ children }: { children: string }) {
  return (
    <span className="rounded bg-white px-2 py-1 text-sm font-bold text-ink tabular-nums">
      {children}
    </span>
  );
}

/** The clock only starts after mount. Rendering a real time on the server would
 * hydrate against a different second and warn, so the first paint is a
 * placeholder on both sides and therefore always matches. */
export function PromoCountdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const deadline = endOfCurrentMonth();
    setRemaining(remainingUntil(deadline));

    const timer = setInterval(
      () => setRemaining(remainingUntil(deadline)),
      MS_PER_SECOND,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <p className="max-w-[92px] text-right text-xs leading-4 text-mute">
        Akan Berakhir dalam waktu:
      </p>
      <div className="flex items-center gap-1 rounded-lg bg-surface p-1.5">
        <Cell>
          {remaining ? `${remaining.days} Hari` : `${PLACEHOLDER} Hari`}
        </Cell>
        <Cell>{remaining ? pad(remaining.hours) : PLACEHOLDER}</Cell>
        <span aria-hidden className="text-sm font-bold text-mute-2">
          :
        </span>
        <Cell>{remaining ? pad(remaining.minutes) : PLACEHOLDER}</Cell>
        <span aria-hidden className="text-sm font-bold text-mute-2">
          :
        </span>
        <Cell>{remaining ? pad(remaining.seconds) : PLACEHOLDER}</Cell>
      </div>
    </div>
  );
}
