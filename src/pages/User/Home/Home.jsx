/** @format */

import { Helmet } from 'react-helmet';

import AllProduct from './AllProduct';
import { BigBanner } from '../../../components';
import DiscountProduct from './DiscountProduct';
import styles from './home.module.scss';
import BrandProduct from './BrandProduct';

function Home() {
  return (
    <>
      <Helmet>
        <title>Laptech.com | Trang chủ</title>
        <meta name="description" content="Description of Homepage" />
      </Helmet>
      <BigBanner />
      <main className={styles.main}>
        <BrandProduct />

        <DiscountProduct />
        <AllProduct />
      </main>
    </>
  );
}
export default Home;
