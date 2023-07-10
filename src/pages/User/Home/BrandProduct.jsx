/** @format */

import { Fab } from '@material-ui/core';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { productService } from '../../../services';
import Section from './Section';
import { useNavigate } from 'react-router-dom';

function BrandProduct() {
  const navigate = useNavigate();
  const [allBrand, setAllBrand] = useState([]);
  useEffect(() => {
    productService.getAllBrands().then((res) => {
      setAllBrand(res.data);
    });
  }, []);

  return (
    <Section styles="rounded-xl overflow-hidden">
      <div style={{ textAlign: 'center', backgroundColor: '#666', marginTop: '10px' }}>
        {allBrand.map((brand) => {
          return (
            <Box style={{ display: 'inline-flex', margin: '10px' }} key={brand.id}>
              <Fab
                variant="extended"
                size="small"
                aria-label="add"
                style={{ padding: '20px', backgroundColor: '#ffffff' }}
                onClick={() => navigate(`brand/${brand.id}`)}
              >
                <img src={brand.logo} alt="" style={{ width: '80px', height: '25px', objectFit: 'contain' }} />
              </Fab>
            </Box>
          );
        })}
      </div>
    </Section>
  );
}

export default BrandProduct;
