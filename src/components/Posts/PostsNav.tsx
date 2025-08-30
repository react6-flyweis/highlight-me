import { Link } from "react-router";

export function PostsNav() {
  return (
    <nav className="text-sm text-slate-500 mb-3">
      <Link to="/posts/reported" className="underline mr-2">
        All Posts
      </Link>
      <span className="mr-2">/</span>
      <Link to="#" className="mr-2 text-slate-600">
        Flagged Posts
      </Link>
      <span className="mr-2">/</span>
      <Link to="#" className="mr-2 text-slate-600">
        Approved Posts
      </Link>
      <span className="mr-2">/</span>
      <Link to="#" className="text-slate-600">
        Removed Posts
      </Link>
    </nav>
  );
}
