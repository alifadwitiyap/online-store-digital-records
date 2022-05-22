import React from 'react';
import PropTypes from 'prop-types';

/**
 * A custom header component to display titles.
 */
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
  /**
   * The text for the header title.
   */
  children: PropTypes.string.isRequired,
  /**
   * Classname for 
   */
  className: PropTypes.string,
};

export default Title;
