import { NavLink } from "react-router";

export function ModerationNav() {
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-10 text-lg font-medium text-slate-500"
    >
      <ol className="flex gap-2 items-center flex-wrap">
        <li>
          <NavLink
            to="/tools"
            end
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Moderation Dashboard
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/tools/content-review"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Content Review
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/tools/reported"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Reported Content
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/tools/keywords"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Keywords
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/tools/settings"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Settings
          </NavLink>
        </li>
        <li className="text-slate-400">/</li>
        <li>
          <NavLink
            to="/tools/logs"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Logs
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
