import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default SidebarSelection;
