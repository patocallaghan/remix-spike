import { Await, Outlet, defer, useLoaderData, useNavigation } from '@remix-run/react';
import { Suspense } from 'react';

export function clientLoader() {
  console.log('started: clientLoader in grandparent.parent.tsx');
  const parent = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ firstName: 'Jane', lastName: 'Doe' });
      console.log('finished: clientLoader in grandparent.parent.tsx');
    }, 2000);
  });
  return defer({ parent });
}

export default function Parent() {
  const { parent } = useLoaderData();
  return (
    <div>
      <Suspense fallback={<div>Parent Loading...</div>}>
        <Await resolve={parent}>
          {(parent) => (
            <>
              <h1>Waterfall Parent</h1>
              <p>
                {parent.firstName} {parent.lastName}
              </p>
              <hr />
            </>
          )}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}
