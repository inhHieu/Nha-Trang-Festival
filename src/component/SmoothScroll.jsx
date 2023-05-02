import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function SmoothScroll({ children }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <motion.div animate={{ y: -scrollY, transition:{bounce:0} }}>
        {children}
        <button onClick={scrollToTop}>Scroll to Top</button>
      </motion.div>
    </>
  );
}

export default SmoothScroll;