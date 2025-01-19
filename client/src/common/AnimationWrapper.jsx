import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1, ease: 'easeInOut' },
  keyValue,
  className
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

AnimationWrapper.propTypes = {
  children: PropTypes.node,
  initial: PropTypes.object,
  animate: PropTypes.object,
  transition: PropTypes.object,
  keyValue: PropTypes.string,
  className: PropTypes.string
};

export default AnimationWrapper;
