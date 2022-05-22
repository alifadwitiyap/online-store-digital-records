import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * A custom button for navigation. Made for sidebar selections.
 */
function SidebarSelection({ text, path }) {
  return (
    <Link
      className="block p-2 text-white rounded hover:bg-purple-700"
      to={path}
    >
      {text}
    </Link>
  );
}

SidebarSelection.propTypes = {
  /**
   * Selection's text/label.
   */
  text: PropTypes.string.isRequired,
  /**
   * A path to redirect to if the button/selection is clicked.
   */
  path: PropTypes.string.isRequired,
};

export default SidebarSelection;
