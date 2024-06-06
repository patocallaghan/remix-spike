import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
    return <div>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Remix Spike</h1>
        <ul style={{display: "flex", justifyContent: "space-between"}}>
          <li>
            <Link to="/waterfall/grandparent">Waterfall Grandparent</Link>
          </li>
          <li>
            <Link to="/waterfall/grandparent/parent">Waterfall Parent</Link>
          </li>
          <li>
            <Link to="/waterfall/grandparent/parent/child">Waterfall Child</Link>
          </li>
          <li>
            <Link to="/blocking/grandparent">Blocking Grandparent</Link>
          </li>
          <li>
            <Link to="/blocking/grandparent/parent">Blocking Parent</Link>
          </li>
          <li>
            <Link to="/blocking/grandparent/parent/child">Blocking Child</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
