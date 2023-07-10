/** @format */

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import numberWithCommas from '../../utils/numberWithCommas';
import styles from './card.module.scss';

function ProductCard(props) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };
  const labels = props.labelList || [];
  return (
    <div className={styles.card} onClick={() => handleClick(props.id)}>
      {/* <Link style={{ margin: 0, padding: 0 }} to={`/detail/${props.id}`}> */}
      <div className={styles.card}>
        <div className={styles.wrap}>
          <div className={styles.image}>
            <img src={props.imagesRepresentUrl[0]} alt={props.imagesRepresentUrl[0]} className={styles.img}></img>
          </div>
          <div className="flex gap-4 ">
            <span className="bg-[#04aa6d] text-[#fff] font-semibold w-[100px] rounded-[2px] text-center">
              {numberWithCommas(props.discountPrice.toFixed(0))} đ
            </span>

            <span
              className={clsx(
                props.price === props.discountPrice && 'hidden',
                props.price !== props.discountPrice &&
                  'text-[#939ca3] line-through w-[100px] rounded-[2px] text-center',
              )}
            >
              {numberWithCommas(props.price)} đ
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {labels.length > 0 &&
              labels.map((label) => (
                <div
                  className="text-[#fff] inline px-2 pb-[1px] bg-indigo-500 rounded"
                  key={label.id}
                  title={label.description}
                >
                  {label.title}
                </div>
              ))}
          </div>

          <p className={styles.title}>{props.name}</p>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default ProductCard;
