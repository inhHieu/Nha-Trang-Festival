import "./fontawasome.js"
import ScrollToTop from "./scrollToTop";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import News from "./Detail/New";
import User from "./Detail/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes >
          <Route path="/" element={<Home />}></Route>
          <Route path="/News" element={<News />}></Route>
          <Route path="/User" element={<User />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
