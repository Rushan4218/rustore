"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef } from "react";

type MenuModalProps = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
};

const MenuModal = forwardRef<HTMLDivElement, MenuModalProps>(
  ({ children, isOpen, className }, ref) => {
    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MenuModal.displayName = "MenuModal";

export { MenuModal };
