import React from 'react';
import PropTypes from 'prop-types';

function Title({ children, className }) {
  return (
    <h1 className={`font-bold text-center ${className}`}>
      {children}
    </h1>
  );
}

Title.defaultProps = {
  className: 'text-xl text-black',
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Title;
