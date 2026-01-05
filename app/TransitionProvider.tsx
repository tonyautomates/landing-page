"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

// Needed to prevent the next route from rendering before the exit animation finishes
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = React.useContext(LayoutRouterContext);

  // Freeze once per mount (intentionally NOT updating on route change)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const frozen = React.useMemo(() => context, []);

  return (
    <LayoutRouterContext.Provider
      value={frozen as React.ContextType<typeof LayoutRouterContext>}
    >
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
     <motion.div
  key={pathname}
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  style={{ willChange: "transform, opacity" }}
>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}