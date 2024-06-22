import { Link } from 'react-router-dom';
import { BiSolidCameraMovie } from "react-icons/bi";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 border-b">
      <Link className="flex items-center gap-3" to={'/'}>
        <BiSolidCameraMovie className=' text-teal-800 text-2xl ' />
        <span className="font-bold text-2xl max-sm:hidden">
          Filmania
        </span>
      </Link>

      <Link
        to={'/create'}
        className="border rounded-full my-2 px-5 p-1 transition hover:bg-teal-600 hover:text-white"
      >
        Film Ekle
      </Link>
    </header>
  );
};

export default Header;
