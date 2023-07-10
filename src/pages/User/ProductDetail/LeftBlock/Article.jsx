/** @format */

import { Box, Button } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SlickBlock from './SlickBlock';
import Parameter from '../RightBlock/Parameter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '90%',
};

function Article() {
  const initProductDetail = useSelector((state) => state.products.productDetail.data);
  const dataProduct = initProductDetail?.data?.product;
  const description = dataProduct?.descriptionDetail !== undefined ? JSON.parse(dataProduct?.descriptionDetail) : [];

  const Art = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [open, setOpen] = useState(false);
    const handleClose = (e) => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    return (
      <div className="flex flex-col justify-center">
        <Box
          sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{ __html: description[0]?.content }}
        ></Box>
        <div className="flex justify-center my-4">
          <Button
            onClick={handleOpen}
            variant="outlined"
            style={{ background: '#04AA6D', color: '#fff', padding: '10px 60px' }}
          >
            Xem thêm
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab className="text-[20px]" label="Thông tin sản phẩm" value="1" />
                  <Tab className="text-[20px]" label="Hình ảnh" value="2" />
                  <Tab className="text-[20px]" label="Thông số kỹ thuật" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div dangerouslySetInnerHTML={{ __html: description[0]?.content }}></div>
              </TabPanel>
              <TabPanel value="2">
                <SlickBlock />
              </TabPanel>
              <TabPanel value="3">
                <Parameter />
              </TabPanel>
            </TabContext>
          </Box>
        </Modal>
      </div>
    );
  };
  return (
    <div>
      <h3>Thông tin sản phẩm</h3>
      <Art />
    </div>
  );
}

export default Article;
