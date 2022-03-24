import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MenuSelection({ text, icon, path }) {
  const className = 'bg-fuchsia-600 w-4/5 lg:w-1/3 p-3 text-lg text-white rounded hover:bg-fuchsia-800';
  return (
    <Link to={path} className={className}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span>{text}</span>
        </div>
        <FaChevronRight />
      </div>
    </Link>
  );
}

MenuSelection.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
};

export default MenuSelection;
