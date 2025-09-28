import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
// import FloatingLogo from "./components/layout/FloatingLogo";
import ChatBot from "./components/ui/ChatBot";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Resources from "./pages/Resources";
import Problems from "./pages/Problems";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Flash_Code from "./pages/Flash_Code"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/flash_code_2025" element={<Flash_Code />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
