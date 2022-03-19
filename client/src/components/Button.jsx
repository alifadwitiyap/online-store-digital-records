import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClickHandler, disabled }) {
  const className = 'bg-fuchsia-600 p-2 text-white rounded hover:bg-fuchsia-800';
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
  children: PropTypes.element,
  onClickHandler: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
