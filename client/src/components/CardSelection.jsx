import React from 'react';
import PropTypes from 'prop-types';

function CardSelection({ icon, text, onClickHandler }) {
  const className = 'bg-purple-600 p-2 text-white rounded hover:bg-purple-800';
  return (
    <button type="button" className={className} onClick={() => onClickHandler()}>
      <div className="w-56 px-6 py-10 max-w-sm flex flex-col items-center">
        <div className="text-7xl">{icon}</div>
        <div className="font-bold py-4 text-xl">{text}</div>
        <span className="border-2 border-white p-1 text-sm rounded">Lihat</span>
      </div>
    </button>
  );
}

CardSelection.defaultProps = {
  onClickHandler: () => {},
};

CardSelection.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func,
};

export default CardSelection;
