import React from "../deps/react.ts";
import { Link } from "../deps/@remix-run/react.ts";

export default function Index() {
  return (
    <div>
      <h1>Wlad Paiva 🔲</h1>
      <ul>
        <li>
          Bitcoin:
          <ul>
            <li>
              <Link to="/bitcoin-in-brazil">Bitcoin in Brazil</Link>
            </li>
          </ul>
        </li>
      </ul>
      <hr />
      <address>
        Written by: <a href="http://wlad.deno.land">Wlad Paiva</a> Last
        modified: May 8, 2022
      </address>
    </div>
  );
}
