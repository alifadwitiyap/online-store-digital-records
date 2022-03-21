import React from 'react';
import PropTypes from 'prop-types';

function Title({ children, size, color }) {
  return (
    <h1 className={`font-bold text-${size} text-${color}`}>{children}</h1>
  );
}

Title.defaultProps = {
  size: 'xl',
  color: 'black',
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Title;
