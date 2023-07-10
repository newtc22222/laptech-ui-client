/** @format */

import { Typography } from '@material-ui/core';
import img from '../../../assets/404.png';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

function NotFound(props) {
  const navigate = useNavigate();
  return (
    <section className="bg-[#EAFF6F]">
      <div className="flex justify-center items-center py-40 flex-col">
        <img src={img} alt="" />
        <Button
          onClick={() => navigate('/')}
          variant="contained"
          style={{ backgroundColor: '#FFF', padding: 15, borderRadius: 30 }}
        >
          <Typography>Back to Homepage</Typography>
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
