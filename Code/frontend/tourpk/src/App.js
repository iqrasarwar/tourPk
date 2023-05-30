import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  redirect
} from "react-router-dom";
import { useEffect } from "react";
import { Home, Services, InAppPlans, Cities, Contract, Login, Signup, AddPackage, CheckOut, AddService, AddHotel, Bookings, HelpAndSupport, GenericInfoAboutService, Listing, BlogPage, AddBlog, Blogs, SpotListing, TourGuideListing, AddTourGuide, AddHotelRoom } from "./pages/index";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

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
      <Route path="/contract" element={<Contract />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/addpackage" element={<AddPackage />} />
      <Route path="/addService" element={<AddService />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/helpandsupport" element={<HelpAndSupport />} />
      <Route path="/AddBlog" element={<AddBlog />} />

      <Route exact path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<InAppPlans />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signupAsTourist" element={<Signup userType="tourist" />} />
      <Route path="/signupAsSeller" element={<Signup userType="seller" />} />
      <Route path="/signupAsTourist" element={<Signup userType="tourist" />} />
      <Route path="/signupAsSeller" element={<Signup userType="seller" />} />
      <Route path="/genericinfo" element={<GenericInfoAboutService />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/Blog/:id" element={<BlogPage />} />
      <Route path="/allBlogs" element={<Blogs />} />
      <Route path="/spotListing" element={<SpotListing />} />
      <Route path="/tourGuideListing" element={<TourGuideListing />} />
      <Route path="/addTourGuide" element={<AddTourGuide/>} />
      <Route path="/addHotel" element={<AddHotel/>} />
      <Route path="/addHotelRoom" element={<AddHotelRoom/>} />
    </Routes>
  );
};

export default App;
