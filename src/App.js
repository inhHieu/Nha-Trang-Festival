import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import News from "./Detail/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/News" element={<News />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
