import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import TableRow from './TableRow';

/**
 * Custom table row (foldable).
 */
function FoldableTableRow({ data, secondaryData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr>
        {data.map((d, idx) => (
          <td key={idx}>
            {d}
            {idx === 0 && (
              <button
                type="button"
                className="ml-2 text-gray-400 border-2 border-gray-400 rounded"
                onClick={() => setIsOpen((o) => !o)}
              >
                {isOpen ? <BsChevronUp /> : <BsChevronDown />}
              </button>
            )}
          </td>
        ))}
      </tr>
      {isOpen && secondaryData.map((d, idx) => <TableRow key={idx} data={d} isSecondary />)}
    </>
  );
}

FoldableTableRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.node),
  secondaryData: PropTypes.arrayOf(PropTypes.node),
};

FoldableTableRow.defaultProps = {
  data: ['Total Biaya Operasional', '60.000'],
  secondaryData: [
    ['Biaya Ops 1', '20.000'],
    ['Biaya Ops 2', '10.000'],
    ['Biaya Ops 3', '20.000'],
    ['Biaya Ops 4', '10.000'],
  ],
};

export default FoldableTableRow;
