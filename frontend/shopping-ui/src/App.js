import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Slot } from "@radix-ui/react-slot";
import Input from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import { Textarea } from "./components/ui/Textarea";
import { Separator } from "./components/ui/Separator";
import { Switch } from "./components/ui/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { Slider } from "./components/ui/Slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/Tooltip";
import { Toggle } from "./components/ui/Toggle";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;