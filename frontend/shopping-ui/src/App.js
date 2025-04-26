import './App.css';
import React, { forwardRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import Input from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import { Textarea } from "./components/ui/Textarea";
import { Separator } from "./components/ui/Separator";
import { Switch } from "./components/ui/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { Slider } from "./components/ui/Slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/Tooltip";
import { Toggle } from "./components/ui/Toggle";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md shadow text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

function App() {
  return (
    <Router>
      <Slider className='w-full' />
      <div className="flex gap-4 p-4">
        <div className="w-full">
          <Label htmlFor="input">Input</Label>
          <Input id="input" placeholder="Input" className="w-full" />
        </div>
        <div className="w-full">
            <Label htmlFor="textarea">Textarea</Label>
            <Textarea id="textarea" placeholder="Textarea" className="w-full" />
        </div>
      </div>
      <div className="flex gap-4 p-4">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">
            <Tooltip >
                <TooltipTrigger asChild>
                    <Button>Change password</Button>
                </TooltipTrigger>
                <TooltipContent>Change your password here.</TooltipContent>
            </Tooltip>
          </TabsContent>
      </Tabs>

        <div className="flex justify-center gap-4">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>        
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="switch" />
          <Label htmlFor="switch">Switch</Label>
        </div>
        <Separator className="w-full" />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
export default App;