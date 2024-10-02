import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f1f1f1', height: '60px', boxSizing: 'border-box' }}>
      <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} ABC University College . All rights reserved.</p>
    </footer>
  );
};

export default Footer;
