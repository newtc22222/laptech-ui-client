/** @format */

import { useRef, useEffect } from 'react';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import styles from './slick.module.scss';

function Slick({ children, autoplay, numberChild }) {
  const body = useRef();
  const wrap = useRef();
  const handleRight = () => {
    body.current.scrollLeft += body.current.clientWidth;
    if (wrap.current.offsetWidth - body.current.offsetWidth - body.current.scrollLeft < 5) {
      body.current.scrollLeft = 0;
    }
  };
  const handleLeft = () => {
    body.current.scrollLeft -= body.current.clientWidth;
    if (body.current.scrollLeft === 0) {
      body.current.scrollLeft += wrap.current.offsetWidth - body.current.offsetWidth;
    }
  };
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(handleRight, 3000);
    return () => {
      clearInterval(id);
    };
  }, [autoplay]);

  return (
    <div className={styles.container}>
      <span className={styles.left} onClick={handleLeft}>
        <i className="text-gray-50 opacity-80">
          <ArrowLeftCircleFill className="text-6xl" />
        </i>
      </span>
      <div className={styles.body} ref={body}>
        <div className={styles.wrap} ref={wrap}>
          {children}
        </div>
      </div>
      <span className={styles.right} onClick={handleRight}>
        <i className="text-gray-50 opacity-80">
          <ArrowRightCircleFill className="text-6xl" />
        </i>
      </span>
    </div>
  );
}

export default Slick;
