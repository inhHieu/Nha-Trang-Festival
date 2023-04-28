import "./fontawasome.js";
import ScrollToTop from "./scrollToTop";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AnimateRoute from "./AnimateRoute.js";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <AnimateRoute />
        <Footer />
      </Router>
    </>
  );
}

export default App;
