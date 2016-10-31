import React from 'react'

const Header = ({label}) => {
  const splitLabel = label.split(' ');

  return (
    splitLabel.length > 1
    ? <span>{splitLabel[0]} <span className="rbc-header-today-span">{splitLabel[1]}</span></span>
    : <span>{label}</span>
  );
}

export default Header
