import { useLoaderData, defer, Await, useMatches } from '@remix-run/react';
import { Suspense } from 'react';

export function clientLoader() {
  console.log('started: clientLoader in grandparent.parent.child.tsx');
  const child = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ firstName: 'Jimmy', lastName: 'Doe' });
      console.log('finished: clientLoader in grandparent.parent.child.tsx');
    }, 6000);
  });
  return defer({
    child,
  })
}

export default function Child() {
  const { child } = useLoaderData();
  const matches = useMatches();
  const { grandparent } = matches.find((match) => match.pathname === '/waterfall/grandparent')?.data;
  console.log('matches in grandparent.parent.child.tsx:', matches);
  return (
    <div>
      <Suspense fallback={<div>Child Loading...</div>}>
        <Await resolve={child}>
          {(child) => (
            <>
              <h1>Waterfall Child</h1>
              <p>
                {child.firstName} {child.lastName}
              </p>
              <hr />
              <Await resolve={grandparent}>
                {(grandparent) => (
                  <>
                    <h1>My grandparent's name is:</h1>
                    <p>
                      {grandparent.firstName} {grandparent.lastName}
                    </p>
                  </>
                )}
              </Await>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
