import React from 'react';
import logoYper from '../../asset/image/logo_yper.svg';
import './Header.scss';
export default function Header() {
  return (
    <header className="header">
      <img src={logoYper} alt="Logo Yper" />
    </header>
  );
}
