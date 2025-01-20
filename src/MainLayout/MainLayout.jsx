import { Outlet } from "react-router-dom";
import {Footer} from "../components/Footer/Footer";
import {Nav} from "../components/Nav/Nav"
import { Header } from "../components/Header/Header";
import { UserContextProvider } from "../context/userContext";

export function MainLayout() {
  return (
    <>
      <Nav/>
      <Header/>
      <UserContextProvider>
        <Outlet />
      </UserContextProvider>
      <Footer />
    </>
  );
}