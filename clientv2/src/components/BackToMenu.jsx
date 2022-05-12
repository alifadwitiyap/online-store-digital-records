import { Link } from 'react-router-dom';

function BackToMenu() {
  return (
    <Link
      to="/"
      className="absolute left-16 bottom-8 font-bold text-purple-500 hover:text-purple-700"
    >
      {'< Menu Utama'}
    </Link>
  );
}

export default BackToMenu;
