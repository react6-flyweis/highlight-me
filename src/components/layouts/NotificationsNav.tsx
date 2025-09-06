import { NavLink } from "react-router";

export function NotificationsNav() {
  return (
    <nav aria-label="breadcrumb" className="mb-6  text-lg">
      <ol className="flex gap-2 items-center flex-wrap">
        <li>
          <NavLink
            end
            to="/notifications/all"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Notifications Dashboard
          </NavLink>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <NavLink
            to="/notifications/create"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Create Notification
          </NavLink>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <NavLink
            to="/notifications/template"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Template
          </NavLink>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <NavLink
            to="/notifications/schedule"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Schedule
          </NavLink>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <NavLink
            to="/notifications/analytics"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Analytics
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
