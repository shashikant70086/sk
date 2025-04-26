import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const Separator = forwardRef(({ className, orientation, decorative = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role={decorative ? undefined : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={separatorVariants({ orientation, className })}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };