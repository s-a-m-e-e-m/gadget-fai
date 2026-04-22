import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Signup from './auth/Signup.jsx';
import Signin from './auth/Signin.jsx';
import Footer from "./components/Footer.jsx";
import Gadget from "./pages/Gadget.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/gadgets/:id" element={<Gadget />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App