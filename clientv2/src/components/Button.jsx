import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button with custom styles.
 */
function Button({ children, onClickHandler, disabled }) {
  const className = 'bg-purple-600 p-2 text-white rounded hover:bg-purple-800';
  return (
    <button type="button" className={className} onClick={() => onClickHandler()} disabled={disabled}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: '',
  onClickHandler: () => {},
  disabled: false,
};

Button.propTypes = {
  /**
   * The text inside the button.
   */
  children: PropTypes.string,
  /**
   * A function that runs if the button is clicked.
   */
  onClickHandler: PropTypes.func,
  /**
   * A boolean that tells whether the button is disabled or not.
   */
  disabled: PropTypes.bool,
};

export default Button;
