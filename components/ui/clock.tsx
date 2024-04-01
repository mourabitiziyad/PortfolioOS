'use client';
import React, { useEffect, useState, useRef } from 'react';

export function Clock({ className }: Readonly<{ className?: string }>) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to synchronize clock with the start of the next minute
    const syncClock = () => {
      setCurrentDate(new Date()); // Update immediately to ensure sync
      const now = new Date();
      const delayUntilNextMinute = 60000 - now.getSeconds() * 1000 - now.getMilliseconds();

      setTimeout(() => {
        setCurrentDate(new Date()); // Sync at the start of the next minute
        intervalId.current = setInterval(() => {
          setCurrentDate(new Date()); // Continue updating every minute
        }, 60000);
      }, delayUntilNextMinute);
    };

    syncClock();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const formattedDate = currentDate.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).replace(/,/g, '');

  return <div className={className}>{formattedDate}</div>;
}
