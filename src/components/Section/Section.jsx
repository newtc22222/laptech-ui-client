/** @format */

import { forwardRef } from 'react';
import clsx from 'clsx';

import css from './section.module.scss';

function Section({ title, styles = 'bg-transparent', children, rightOption, styleTitle }, ref) {
  return (
    <section className={clsx(styles)} ref={ref}>
      <div className={clsx(title && css.head, styleTitle)}>
        <p>{title}</p>
        {rightOption}
      </div>
      <div className="flex gap-6 flex-wrap justify-center">{children}</div>
    </section>
  );
}

export default forwardRef(Section);
