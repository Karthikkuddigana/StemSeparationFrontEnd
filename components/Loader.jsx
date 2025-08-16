'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // small delay
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div style={{ position: 'relative' }}>
      {children}

      {/* overlay loader */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.8)', // semi-transparent overlay
            zIndex: 9999,
          }}
        >
          Loading...
          {/* put your animation here */}
        </div>
      )}
    </div>
  );
}
