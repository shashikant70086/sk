import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, History, User, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border-b border-border/40 sticky top-0 z-50`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-semibold tracking-tight">Shopping Assistant</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {/* Desktop Navigation */}
        <div className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-6`}>
          <nav className="flex items-center space-x-6">
            <Link to="/history" className="hover:text-primary transition-colors flex items-center">
              <History className="h-4 w-4 mr-1" />
              <span>History</span>
            </Link>
          </nav>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user && (
                <DropdownMenuLabel className="font-normal">
                  <span className="block text-sm">Signed in as</span>
                  <span className="font-medium">{user.username}</span>
                </DropdownMenuLabel>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-6 flex flex-col space-y-4">
            <Link 
              to="/history" 
              className="hover:text-primary transition-colors flex items-center py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <History className="h-4 w-4 mr-2" />
              <span>History</span>
            </Link>
            
            <div className="flex items-center justify-between py-2">
              <span>Theme</span>
              <ThemeToggle />
            </div>
            
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="justify-start py-2 px-0 hover:bg-transparent hover:text-primary"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out ({user?.username})</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
