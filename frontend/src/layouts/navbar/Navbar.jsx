import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../../Context/AuthContext";
import RequireAuthChildrenComponents from "../../components/auth/RequireAuthChildrenComponents";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LinkedTreeLogo from "./components/LinkedTreeLogo";
import AnchorLink from "./components/AnchorLink";

const MainNav = () => {
  const auth = useAuth();
  const [hamburger, setHamburger] = useState(false);
  const toggleHamburger = (e) => {
    e.target.name = e.target.name === "menu" ? "close" : "menu";
  };
  const logout = () => {
    auth.logout();
  };
  return (
    <nav className="flex justify-between items-center absolute top-10 left-1/2 transform -translate-x-1/2  bg-slate-200 rounded-full pl-4 pr-4 h-20 mx-auto w-[95%]">
      <div className="nav-links md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-9%] md:w-auto w-full flex items-center">
        <a href="/" className="no-underline text-black">
          <LinkedTreeLogo />
        </a>
        <ul className="flex lg:flex-row flex-col md:items-center text-center md:gap-4 gap-8 mx-auto pt-3 ">
          <li>
            <AnchorLink href="/" text="Templates" />
          </li>
          <li>
            <AnchorLink href="/" text="Discover" />
          </li>
          <li>
            <AnchorLink href="/" text="Pricing" />
          </li>
          <li>
            <AnchorLink href="/" text="Learn" />
          </li>
          <li>
            <AnchorLink href="/admin" text="Admin" />
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <a href="/login" className="no-underline">
          <div className="bg-slate-300 p-3 rounded-md">
            <span className="text-black font-bold">Log in</span>
          </div>
        </a>
        <a href="/signup" className="no-underline">
          <div className="bg-black rounded-full  p-3">
            <span className="text-white">Sign up free</span>
          </div>
        </a>
        {hamburger ? (
          <MenuIcon
            className="lg:hidden"
            onClick={() => setHamburger((prevState) => !prevState)}
          />
        ) : (
          <CloseIcon
            className="lg:hidden"
            onClick={() => setHamburger((prevState) => !prevState)}
          />
        )}
      </div>
    </nav>

    // <Navbar expand="lg" className="bg-success navbar-light mainNav" fixed="top">
    //   <Container fluid>
    //     <Navbar.Brand href="/">LinkedTree</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: "100px" }}
    //         navbarScroll
    //       >
    //         <Nav.Link href="/">Home</Nav.Link>
    //         {auth.user ? (
    //           <>
    //             <RequireAuthChildrenComponents roles={["ADMIN"]}>
    //               <Nav.Link href="/admin">Admin</Nav.Link>
    //             </RequireAuthChildrenComponents>
    //           </>
    //         ) : null}
    //         <NavDropdown title="Link" id="navbarScrollingDropdown">
    //           <NavDropdown.Item href="#action4">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action5">
    //             Something else here
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //       <Form className="d-flex">
    //         <Form.Control
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />

    //         <button
    //           onClick={logout}
    //           className="bg-slate-200 rounded-md p-2 font-semibold hover:bg-slate-400 hover:text-slate-100 transition-colors duration-100 ease-linear"
    //         >
    //           Logout
    //         </button>
    //       </Form>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default MainNav;
