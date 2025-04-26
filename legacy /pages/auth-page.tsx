
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import "@/components/stars.css";

// Custom CSS for background
const additionalStyles = `
  .stars {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
    z-index: 0;
  }

  .twinkling {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
    z-index: 1;
    animation: move-twink-back 200s linear infinite;
  }

  @keyframes move-twink-back {
    from { background-position: 0 0; }
    to { background-position: -10000px 5000px; }
  }
`;

// Login validation schema
const loginSchema = insertUserSchema.extend({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Register validation schema
const registerSchema = insertUserSchema.extend({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function AuthPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "shopping",
      password: "shopping123",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    registerMutation.mutate(values);
  }

  return (
    <>
      <style>{additionalStyles}</style>
      <div className="min-h-screen relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center p-6 overflow-hidden">

        {/* Stars background if dark mode */}
        {theme === "dark" && (
          <>
            <div className="stars" />
            <div className="twinkling" />
          </>
        )}

        {/* Theme toggle button */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Top title and logo */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex flex-col items-center z-10 mt-8"
        >
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-white/10">
            <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
          <h2 className="text-white text-3xl font-bold mt-4 text-center drop-shadow">
            Shopping Assistant
          </h2>
          <p className="text-white text-center text-sm mt-1 drop-shadow">
            ✨ Making your shopping experience magical ✨
          </p>
        </motion.div>

        {/* Form container */}
        <motion.div
          className="relative w-full max-w-md mt-12 z-10"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Login form */}
          <div
            className="absolute w-full bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 w-full">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Enter username"
                          className="bg-white/30 text-white placeholder-white/70 border-white/30 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          className="bg-white/30 text-white placeholder-white/70 border-white/30 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-none"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-4 text-sm text-white/80 hover:underline"
            >
              Don't have an account? Sign up
            </button>
          </div>

          {/* Register form */}
          <div
            className="absolute w-full bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 w-full">
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Create a username"
                          className="bg-white/30 text-white placeholder-white/70 border-white/30 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder="Create a password"
                          className="bg-white/30 text-white placeholder-white/70 border-white/30 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 border-none"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>
            <button
              onClick={() => setIsFlipped(false)}
              className="mt-4 text-sm text-white/80 hover:underline"
            >
              Already have an account? Log in
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
