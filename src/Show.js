import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// interface Props {
//     children: JSX.Element;
//     width?: "max-content" | "100%";
// }

export const Show = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {amount:.5} );

  const control = useAnimation();

  useEffect(() => {
      if (isInView) {
        console.log(isInView)
      control.start("visible");
    } 
  }, [isInView]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={control}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
