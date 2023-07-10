/** @format */

import Offcanvas from '../../../components/Offcanvas/Offcanvas';
import CartBox from './CartBox';

function CartOffcanvas({ show, handleClose }) {
  return (
    <Offcanvas show={show} handleClose={handleClose}>
      <CartBox />
    </Offcanvas>
  );
}

export default CartOffcanvas;
