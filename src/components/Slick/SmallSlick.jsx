import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import styles from './smallslick.module.scss';
function SmallSlick({ children, autoplay }) {
    const body = useRef();
    const wrap = useRef();
    const handleRight = () => {
        body.current.scrollLeft += body.current.clientWidth;
        if (wrap.current.offsetWidth - body.current.offsetWidth - body.current.scrollLeft < 10) {
            body.current.scrollLeft = 0;
        }
    };
    const handleLeft = () => {
        body.current.scrollLeft -= body.current.clientWidth;
        if (body.current.scrollLeft == 0) {
            body.current.scrollLeft += wrap.current.offsetWidth - body.current.offsetWidth;
        }
    };

    useEffect(() => {
        if (!autoplay) return;
        const id = setInterval(handleLeft, 5000);

        return () => {
            clearInterval(id);
        };
    }, []);
    useEffect(() => {}, []);

    return (
        <div className={styles.container}>
            <span className={styles.left} onClick={handleLeft}>
                <i>
                    <ChevronLeft className="text-6xl text-gray-300" />
                </i>
            </span>

            <div className={styles.body} ref={body}>
                <div className={styles.wrap} ref={wrap}>
                    {children}
                </div>
            </div>

            <span className={styles.right} onClick={handleRight}>
                <i>
                    <ChevronRight className="text-6xl text-gray-300" />
                </i>
            </span>
        </div>
    );
}

export default SmallSlick;
