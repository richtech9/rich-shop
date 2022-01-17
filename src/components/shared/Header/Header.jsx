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
    const allpath = ["/", "/shop", "/about", "/profile"];
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
          <div className="bottom-menu">
            <div
              style={{
                background: "#d05278",
                borderRadius: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ul className="m-menu">
                <li
                  className={"/" === router.pathname ? `active` : ``}
                  onClick={() => router.push("/")}
                >
                  <i class="far fa-home"></i>
                </li>
                <li
                  className={"/about" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/about")}
                >
                  <i class="far fa-info"></i>
                </li>
                <li
                  className={"/shop" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/shop")}
                >
                  <i class="far fa-address-book"></i>
                </li>
                <li
                  className={"/profile" === router.pathname ? "active" : ``}
                  onClick={() => router.push("/profile")}
                >
                  <i class="far fa-user"></i>
                </li>
                <div class={path ? "" : "indicator"}></div>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
