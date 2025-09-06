import { NavLink } from "react-router";

export function SecurityNav() {
  return (
    <nav aria-label="breadcrumb" className="my-1 text-muted-foreground">
      <ol className="flex gap-2 items-center flex-wrap">
        <li>
          <NavLink
            to="/security"
            end
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            App Configuration
          </NavLink>
        </li>
        <li className="text-muted-foreground">/</li>
        <li>
          <NavLink
            to="/security/audit-log"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary hover:underline"
                : "hover:underline"
            }
          >
            Security &amp; Logs
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
