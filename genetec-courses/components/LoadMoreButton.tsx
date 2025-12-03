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
        className="px-6 py-3 text-white rounded-md"
        style={{
          backgroundColor: '#3DC1F3'
        }}
        whileHover={{ scale: 1.05, backgroundColor: '#2AB8E8' }}
        whileTap={{ scale: 0.95 }}
      >
        Load More
      </motion.button>
    </div>
  );
}
