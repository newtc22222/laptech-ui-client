/** @format */

import { Paper } from '@material-ui/core';

function Footer() {
  return (
    <Paper>
      <footer style={{ backgroundColor: '#04AA6D', color: '#FFF' }}>
        <div className="p-8 flex justify-center">
          <p>© 2023 Laptech.com</p>
        </div>
      </footer>
    </Paper>
  );
}

export default Footer;
