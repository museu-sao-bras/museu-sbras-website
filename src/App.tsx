import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import Exhibitions from "./pages/Exhibitions";
import Tours from "./pages/Tours";
import Activities from "./pages/Activities";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import ExhibitionsAdmin from "./pages/ExhibitionsAdmin";
import NotFound from "./pages/NotFound";
import "@/i18n/config";
import PermanentExhibitions from "./pages/PermanentExhibitions";
import TemporaryExhibitions from "./pages/TemporaryExhibitions";
import ArchiveExhibitions from "./pages/ArchiveExhibitions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exhibitions" element={<Exhibitions />} />
              <Route path="/exhibitions/permanent" element={<PermanentExhibitions />} />
              <Route path="/exhibitions/temporary" element={<TemporaryExhibitions />} />
              <Route path="/exhibitions/previous" element={<ArchiveExhibitions />} />
              <Route path="/admin/exhibitions" element={<ExhibitionsAdmin />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
