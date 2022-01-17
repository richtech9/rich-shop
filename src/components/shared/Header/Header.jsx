import { header } from "data/data.header";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";
import { navItem } from "data/data.header";
import { CartContext } from "pages/_app";
import AppContext from "storeData/AppContext";

export const Header = () => {
  const {
    state: { cartData, user },
  } = useContext(AppContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);

  // For Fixed nav
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      setFixedNav(true);
    } else {
      setFixedNav(false);
    }
  };
  return (
    <>
      {/* <!-- BEGIN HEADER --> */}
      <header className="header">
        {promo && (
          <div className="header-top">
            <span>30% OFF ON ALL PRODUCTS ENTER CODE: shop2022</span>
            <i
              onClick={() => setPromo(false)}
              className="header-top-close js-header-top-close icon-close"
            ></i>
          </div>
        )}
        {/* <div className={`header-content ${fixedNav ? "fixed" : ""}`}> */}
        <div className={`header-content fixed`} style={{ background: "#fff" }}>
          <div className="header-logo">
            <Link href="/">
              <a>
                <img src={header.logo} alt="" width={250} />
              </a>
            </Link>
          </div>
          <div className="header-box">
            {/* Nav */}
            <Nav navItem={navItem} />
            {/* header options */}
            <ul className="header-options">
              <li>
                <Link href="/faq">
                  <a>
                    <i className="icon-search"></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={user ? "/profile" : "/login"}>
                  <a>
                    <i className="icon-user"></i>
                    {user ? user.name : " Login"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/wishlist">
                  <a>
                    <i className="icon-heart"></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <a>
                    <i className="icon-cart"></i>
                    <span>{cartData.length ?? "0"}</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="js-btn-menu">
            {/* {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))} */}
            <Link href="/cart">
              <a>
                <i className="icon-cart"></i>
                <span>{cartData.length ?? "0"}</span>
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
