/** @format */

import AngleLeft from '../Icons/AngleLeft';

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        fontSize: '40px',
        display: 'block',
        zIndex: '2',
        left: 0,
        height: '40px',
        width: '40px',
        opacity: '0.8',
        color: 'white',
      }}
    >
      <span className="shadow-md absolute flex items-center justify-center top-0 right-0 bg-white rounded-full inline-block w-full h-full">
        <AngleLeft />
      </span>
    </button>
  );
}

export default PrevArrow;
