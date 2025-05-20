import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  message: string | null;
}

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300 text-sm"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
