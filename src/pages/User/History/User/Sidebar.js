/** @format */

import { Typography } from '@material-ui/core';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const sidebarItems = [
  { label: 'Hồ sơ', icon: <PersonOutlineOutlinedIcon />, path: '/user/account' },
  { label: 'Đổi mật khẩu', icon: <VpnKeyIcon />, path: '/user/change-password' },
  { label: 'Lịch sử đơn hàng', icon: <HistoryOutlinedIcon />, path: '/user/purchase' },
];

const Sidebar = () => {
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};

  useEffect(() => {
    setSelectedItem(sidebarItems[0]);
  }, []);
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    navigate(item.path);
    setSelectedItem(item);
  };

  return (
    <div className="flex h-[100vh] pt-[120px]">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div className="flex gap-2 items-center justify-center my-4">
          <Typography style={{ fontWeight: 'bold' }}>{user?.name}</Typography>
        </div>
        <Divider />
        {sidebarItems.map((item) => (
          <div
            key={item.path}
            onClick={() => handleItemClick(item)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '10px 40px',
              backgroundColor: item === selectedItem ? '#04AA6D' : '#fff',
              color: item === selectedItem ? '#fff' : 'black',
            }}
          >
            {item.icon}
            <Typography style={{ marginLeft: '10px' }}>{item.label}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
