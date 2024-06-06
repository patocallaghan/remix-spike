import { Outlet, useLoaderData } from '@remix-run/react';

export function clientLoader() {
  console.log('started: clientLoader in blocking.grandparent.parent.tsx');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ firstName: 'Jane', lastName: 'Doe' });
      console.log('finished: clientLoader in blocking.grandparent.parent.tsx');
    }, 2000);
  });
}

export default function Parent() {
  const parent = useLoaderData();
  return (
    <div>
      <>
        <h1>Blocking Parent</h1>
        <p>
          {parent.firstName} {parent.lastName}
        </p>
        <hr />
      </>
      <Outlet />
    </div>
  );
}
