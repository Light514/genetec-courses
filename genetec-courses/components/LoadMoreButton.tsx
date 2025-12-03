"use client";
import { motion } from 'framer-motion';

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
}

export function LoadMoreButton({ onClick, hasMore }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <motion.button
        onClick={onClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Load More
      </motion.button>
    </div>
  );
}
