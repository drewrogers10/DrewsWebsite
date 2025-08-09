import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter basename="/DrewsWebsite">
      <div className="min-h-screen flex flex-col">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
