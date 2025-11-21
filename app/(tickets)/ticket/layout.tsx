import React from 'react';

export default function TicketLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
        {children}
    </div>
  );
}