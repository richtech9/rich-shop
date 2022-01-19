import { header } from "data/data.header";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";
import { navItem } from "data/data.header";
import { CartContext } from "pages/_app";
import AppContext from "storeData/AppContext";
import { useRouter } from "next/router";

export const Header = () => {
  const {
    state: { cartData, user },
  } = useContext(AppContext);
  const [promo, setPromo] = useState(true);
  const [path, setPath] = useState(false);
  const [fixedNav, setFixedNav] = useState(false);
  const router = useRouter();
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
  useEffect(() => {
    const allpath = ["/", "/shop", "/about", "/profile", "/wishlist"];
    let isPath = false;
    allpath.map((v) => {
      if (v == router.pathname) {
        isPath = true;
      }
    });

    if (isPath) {
      setPath(false);
    } else {
      setPath(true);
    }
  });
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
                <img src={header.logo} alt="" width={190} />
              </a>
            </Link>
          </div>
          <div className="header-box">
            {/* Nav */}
            <Nav navItem={navItem} />
            {/* header options */}
            <ul className="header-options">
              {/* <li>
                <Link href="/faq">
                  <a>
                    <i className="icon-search"></i>
                  </a>
                </Link>
              </li> */}
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
                    <i className="fas fa-shopping-bag"></i>
                    <span>{cartData.length ?? "0"}</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="js-btn-menu" style={{ position: "relative" }}>
            {/* {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))} */}
            <Link href="/cart">
              <a
                style={
                  "/cart" === router.pathname
                    ? { fontSize: "24px" }
                    : { color: "#333", fontSize: "24px" }
                }
              >
                <i className="fas fa-shopping-bag"></i>
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#744d2e",
                    fontFamily: '"Montserrat"',
                    fontWeight: "700",
                    fontSize: "12px",
                    color: "#fff",
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                  }}
                >
                  {cartData.length ?? "0"}
                </span>
              </a>
            </Link>
          </div>
          <div className="bottom-menu">
            <div
              style={{
                //background: "#744d2e",
                //borderRadius: "35px",
                boxShadow: "-2px -2px 14px -4px rgba(0,0,0,0.25)",
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ul className="m-menu">
                <li
                  className={"/about" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/about")}
                >
                  <i className="fal fa-users"></i>
                </li>

                <li
                  className={"/shop" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/shop")}
                >
                  <i className="far fa-store"></i>
                </li>
                <li
                  className={"/" === router.pathname ? `active` : ``}
                  onClick={() => router.push("/")}
                >
                  <i className="far fa-home"></i>
                </li>
                <li
                  className={"/wishlist" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/wishlist")}
                >
                  <i className="far fa-heart"></i>
                </li>
                <li
                  className={"/profile" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/profile")}
                >
                  <i className="far fa-user"></i>
                </li>
                <div className={path ? "" : "indicator"}></div>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
