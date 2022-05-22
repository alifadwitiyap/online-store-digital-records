import React from 'react';
import PropTypes from 'prop-types';

/**
 * A custom card with an icon and a label. Made for selections.
 */
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
  /**
   * The icon displayed, picturing the selection.
   */
  icon: PropTypes.element.isRequired,
  /**
   * The selection's label.
   */
  text: PropTypes.string.isRequired,
  /**
   * A function that runs when the card is selected/clicked.
   */
  onClickHandler: PropTypes.func,
};

export default CardSelection;
