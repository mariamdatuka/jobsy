import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedViewProps = {
  children: ReactNode;
  viewKey: string | number; // unique key for this view
};

const AnimatedView = ({ children, viewKey }: AnimatedViewProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedView;
