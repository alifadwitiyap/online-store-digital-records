import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Custom table row (normal).
 */
function TableRow({ data, isSecondary, isTotal }) {
  let className = "";
  if (isSecondary) className = 'text-gray-500 text-sm';
  if (isTotal) className = 'text-white font-normal bg-purple-600';

  return (
    <tr className={className}>
      {data.map((d, idx) => (
        <td key={idx}>{d}</td>
      ))}
    </tr>
  );
}

TableRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.node),
};

TableRow.defaultProps = {
  data: [
    '001.00',
    'Gamis X',
    110.0,
    <>
      <Button>Edit</Button>
      <Button>Hapus</Button>
    </>,
  ],
};

export default TableRow;
