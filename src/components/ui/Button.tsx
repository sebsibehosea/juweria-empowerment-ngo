// src/components/ui/Button.tsx
import React from "react";
import { motion } from "framer-motion";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  children: React.ReactNode;
}

export default function Button({ variant = "solid", children, ...rest }: Props) {
  const base = "px-5 py-2 rounded-lg font-medium transition";
  const solid = "bg-emerald-600 text-white hover:bg-emerald-700 shadow";
  const outline = "bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50";

  return (
    <motion.button whileTap={{ scale: 0.98 }} className={`${base} ${variant === "solid" ? solid : outline}`} {...rest}>
      {children}
    </motion.button>
  );
}
