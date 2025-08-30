import { NavLink } from "react-router";

export function ContestsNav() {
  return (
    <nav className="flex items-center gap-4 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <NavLink
            to="/contests/prize-criteria"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Prize Criteria
          </NavLink>
        </li>
        <li aria-hidden className="px-1">
          /
        </li>
        <li>
          <NavLink
            to="/contests/prize-tiers"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Prize Tiers
          </NavLink>
        </li>
        <li aria-hidden className="px-1">
          /
        </li>
        <li>
          <NavLink
            to="/contests/prize-details"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Prize Details
          </NavLink>
        </li>
        <li aria-hidden className="px-1">
          /
        </li>
        <li>
          <NavLink
            to="/contests/past-winners"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Past Winners Upload
          </NavLink>
        </li>
        <li aria-hidden className="px-1">
          /
        </li>
        <li>
          <NavLink
            to="/contests/prize-distribution"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Prize Distribution
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
