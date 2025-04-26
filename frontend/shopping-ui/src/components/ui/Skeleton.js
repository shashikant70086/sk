import React from 'react';
import { cva } from 'class-variance-authority';

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    defaultVariants: {},
  }
);

function Skeleton({ className, ...props }) {
  return (
    <div
      className={skeletonVariants({ className })}
      {...props}
    />
  );
}

export { Skeleton };