import { NavLink } from "react-router";

export function HashtagsNav() {
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-6 tex-lg font-semibold text-slate-500"
    >
      <ol className="flex gap-2 items-center">
        <li>
          <NavLink
            end
            to="/hashtags"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Hashtag Dashboard
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/hashtags/management"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Hashtag Management
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li className="text-slate-600">
          <NavLink
            to="/hashtags/categories"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Category Management
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
