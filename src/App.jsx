import "../src/context/fontawasome";
import ScrollToTop from "../src/context/scrollToTop";
import Header from "../src/component/Header/Header";
import Footer from "../src/component/Footer";
import AnimateRoute from "../src/context/AnimateRoute";
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
