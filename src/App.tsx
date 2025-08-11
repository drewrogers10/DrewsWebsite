import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransitionProvider } from "./contexts/TransitionContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdvancedPageTransition from "./components/AdvancedPageTransition";
import { AutoTransitionEnhancer } from "./utils/AutoTransitionEnhancer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <TransitionProvider>
        <BrowserRouter basename="/DrewsWebsite">
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <a href="#main" className="skip-link">Skip to main content</a>
            <Navbar />
            <main id="main" className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <AdvancedPageTransition />
            <AutoTransitionEnhancer />
          </div>
        </BrowserRouter>
      </TransitionProvider>
    </ThemeProvider>
  );
}

export default App;
