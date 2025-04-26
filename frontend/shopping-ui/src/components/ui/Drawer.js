
import React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';

const Drawer = ({ children, ...props }) => (
  <DrawerPrimitive.Root {...props}>
    {children}
  </DrawerPrimitive.Root>
);

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/80 ${className || ''}`}
    {...props}
  />
));

DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Content
    ref={ref}
    className={`fixed inset-y-0 right-0 z-50 h-full w-3/4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm ${className || ''}`}
    {...props}
  >
    {children}
  </DrawerPrimitive.Content>
));

DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export { Drawer, DrawerTrigger, DrawerContent, DrawerPortal, DrawerClose, DrawerOverlay };
