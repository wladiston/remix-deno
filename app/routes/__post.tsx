import React from "../deps/react.ts";
import { Outlet, Link } from "../deps/@remix-run/react.ts";

export default function Post() {
  return (
    <div>
      <Link to="..">Go back</Link>
      <hr />
      <Outlet />
    </div>
  );
}
