import { createRouter, Link } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <h1 className="font-serif text-3xl font-medium tracking-tight">Missing page</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        That chapter is not in the primer.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 items-center text-sm text-foreground underline-offset-4 hover:underline"
      >
        Return to the path
      </Link>
    </div>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
