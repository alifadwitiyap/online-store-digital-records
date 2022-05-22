import { Children } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

/**
 * Custom table.
 */
function Table({ columnNames, children }) {
  return (
    <table className="table rounded-table">
      <thead>
        <tr>
          {columnNames.map((columnName, idx) => (
            <th key={idx}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Children.map(children, (child) => child)}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.node)],
    PropTypes.node
  ),
};

Table.defaultProps = {
  columnNames: ['Kode', 'Nama', 'Harga Modal', 'Action'],
  children: [
    <TableRow />,
    <TableRow />,
    <TableRow />,
    <TableRow />
  ],
}

export default Table;
