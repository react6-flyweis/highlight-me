import { NavLink } from "react-router";

export function AppSettingsNav() {
  return (
    <nav aria-label="breadcrumb" className="mb-6 text-muted-foreground">
      <ol className="flex gap-2 items-center flex-wrap">
        <li>
          <NavLink
            to="/settings/post-window"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Post window settings
          </NavLink>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <NavLink
            to="/settings/media-limits"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Media Upload Limits
          </NavLink>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <NavLink
            to="/settings/messages"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Custom Messages
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
