

import React from "react";

export default function Card({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
