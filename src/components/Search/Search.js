/** @format */

import { IconButton, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsByName } from '../../redux/product/productsApi';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(() => ({
  inputBase: {
    height: 38,
    width: 400,
    padding: '10px',
    border: 'none',
    fontSize: '1.2rem',
    borderRadius: 18,
    color: 'black',
    backgroundColor: '#fff',
    lineHeight: 38,
    outline: 0,
  },
}));

const SearchProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    getProductsByName(dispatch, searchValue);
    setTimeout(() => {
      setLoading(false);
      navigate(`/search?keyword=${searchValue}`);
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Gọi hàm handleSearch khi nhấn phím "Enter"
      handleSearch();
    }
  };
  const handleClearSearchValue = () => {
    setSearchValue('');
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <div>
        <InputBase
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className={classes.inputBase}
          startAdornment={
            <IconButton
              onClick={() => {
                handleSearch();
              }}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          }
          endAdornment={
            searchValue !== '' && (
              <>
                <IconButton
                  onClick={() => {
                    handleClearSearchValue();
                  }}
                >
                  <CloseOutlinedIcon fontSize="large" />
                </IconButton>
              </>
            )
          }
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SearchProduct;
