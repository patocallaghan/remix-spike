import { Outlet, useLoaderData } from '@remix-run/react';

export function clientLoader() {
  console.log('started: clientLoader in blocking.grandparent.tsx');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ firstName: 'John', lastName: 'Doe' });
      console.log('finished: clientLoader in blocking.grandparent.tsx');
    }, 1000);
  });
}

export default function GrandParent() {
  const grandparent = useLoaderData();
  return (
    <div>
      <>
        <h1>Blocking Grandparent</h1>
        <p>
          {grandparent.firstName} {grandparent.lastName}
        </p>
        <hr />
      </>
      <Outlet />
    </div>
  );
}
