import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    defaultVariants: {},
  }
);

const Label = forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      className={labelVariants({ className })}
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = "Label";

export { Label };