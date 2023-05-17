import { Link } from "react-router-dom";

interface NavbarProps {
  type: string
}

export default function Navbar({type}: NavbarProps ) {
  return (
    <section className="absolute h-max top-0 p-5 left-0  w-full flex justify-between">
      <h1 className=" self-center text-blue-400 text-4xl font-bold sm:text-5xl">
        Memories
      </h1>
      <Link
        to={type === 'register' ? '/signup' : '/'}
        className=" transition-colors duration-75 py-2 px-3 text-lg sm:py-3 sm:px-5 border sm:text-xl border-blue-500 rounded-md cursor-pointer hover:bg-slate-300"
      >
        {type === 'register' ? 'signup' : 'login' }
      </Link>
    </section>
  );
}
