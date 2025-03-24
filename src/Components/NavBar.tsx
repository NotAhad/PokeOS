import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="flex justify-center mt-[1rem]">
      <div className="flex justify-between w-[32rem] lg:w-[50%] font-bold items-center tracking-[0.1em]">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-indigo-900 hover:text-indigo-900"
              : "text-white hover:text-indigo-900"
          }
        >
          POKEDEX
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-indigo-900 hover:text-indigo-900"
              : "text-white hover:text-indigo-900"
          }
        >
          FAVOURITES
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-indigo-900 hover:text-indigo-900"
              : "text-white hover:text-indigo-900"
          }
        >
          COMPARE
        </NavLink>
        <NavLink
          to="/game"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-indigo-900 hover:text-indigo-900"
              : "text-white hover:text-indigo-900"
          }
        >
          GAME
        </NavLink>
      </div>
    </div>
  );
};
