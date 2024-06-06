import { Await, Outlet, defer, useLoaderData, useNavigation } from '@remix-run/react';
import { Suspense } from 'react';

export function clientLoader() {
  console.log('started: clientLoader in grandparent.tsx');
  const grandparent = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ firstName: 'John', lastName: 'Doe' });
      console.log('finished: clientLoader in grandparent.tsx');
    }, 1000);
  });
  return defer({ grandparent });
}

export default function GrandParent() {
  const { grandparent } = useLoaderData();
  return (
    <div>
      <Suspense fallback={<div>Grandparent Loading...</div>}>
        <Await resolve={grandparent}>
          {(grandparent) => (
            <>
              <h1>Waterfall Grandparent</h1>
              <p>
                {grandparent.firstName} {grandparent.lastName}
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
