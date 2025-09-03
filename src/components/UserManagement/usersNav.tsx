import { NavLink } from "react-router";

export function UsersNav() {
  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-slate-500">
      <ol className="flex gap-2 items-center">
        <li>
          <NavLink
            to="/users"
            end
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            All User
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/users/reported"
            end
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Reported Users
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>

        <li className="text-slate-500">
          <NavLink
            onClick={(e) => e.preventDefault()}
            to="/users/profile/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            User Profile
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
