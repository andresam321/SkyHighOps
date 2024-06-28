import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import './Layout.css'; // Import the CSS for layout

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="layout-container">
      <ModalProvider>
        <Navigation />
        <div className="content-container">
          {isLoaded && <Outlet />}
          <Modal />
        </div>
        <Footer />
      </ModalProvider>
    </div>
  );
}