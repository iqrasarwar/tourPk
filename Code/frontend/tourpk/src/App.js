import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import InAppPlans from "./pages/InAppPlans/InAppPlans";
import About from "./pages/About/About";
import Contract from "./pages/Contract/Contract";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import SignupTourist from "./pages/SignupTourist/SignupTourist";
<<<<<<< HEAD
import CheckOut from "./pages/CheckOut/CheckOut";
// import SignupServiceProvider from "./pages/SignupServiceProvider/SignupServiceProvider";
=======
import AddPackage from "./pages/AddPackage/AddPackage";
>>>>>>> 3fa5b0dd7b645bc76619aa6600307f37ba87404c

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  //Scroll to top on new page navigation, except for back button
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  //Update meta title and description on route change
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<InAppPlans />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contract />} />
      <Route path="/login" element={<Login />} />
<<<<<<< HEAD
      <Route path="/signup" element={<SignupTourist />} />
      <Route path="/checkout" element={<CheckOut />} />
      {/* <Route path="/signup" element={<SignupServiceProvider />} /> */}
=======
      <Route path="/signup" element={<SignupTourist />} />F
      <Route path="/addpackage" element={<AddPackage />} />
>>>>>>> 3fa5b0dd7b645bc76619aa6600307f37ba87404c
    </Routes>
  );
};

export default App;
