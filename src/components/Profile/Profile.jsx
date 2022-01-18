import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ProfileAside } from "./ProfileAside/ProfileAside";
import { ProfileOrders } from "./ProfileOrders/ProfileOrders";
import withAuth from "auth/withAuth";
import AppContext from "storeData/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Address from "./Address/Address";
import AddressAdd from "./Address/AddressAdd";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const {
    dispatch,
    state: { user },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const logout = async () => {
    setLoading(true);
    const res = await axios.get("auth/logout");
    if (res.data) {
      const s = await router.push("/");
      if (s) {
        toast.success(res.data.message);
        dispatch({ type: "LOG_OUT" });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    }
  }, []);
  return (
    <>
      {/* <!-- BEGIN PROFILE --> */}
      <div className="profile">
        <div className="wrapper">
          <div className="profile-content">
            <ProfileAside />
            <div className="profile-main">
              <div className="tab-wrap">
                <ul className="nav-tab-list tabs">
                  <li
                    onClick={() => setActiveTab("myInfo")}
                    className={activeTab === "myInfo" ? "active" : ""}
                  >
                    My info
                  </li>
                  <li
                    onClick={() => setActiveTab("address")}
                    className={
                      activeTab === "address" || activeTab === "addressadd"
                        ? "active"
                        : ""
                    }
                  >
                    Addresses
                  </li>
                  <li
                    onClick={() => setActiveTab("orders")}
                    className={activeTab === "orders" ? "active" : ""}
                  >
                    My orders
                  </li>
                  <li
                    onClick={() => router.push("/wishlist")}
                    className={activeTab === "wishList" ? "active" : ""}
                  >
                    Wishlist
                  </li>
                </ul>

                <div className="box-tab-cont">
                  {activeTab === "myInfo" && (
                    <div className="tab-cont" id="profile-tab_1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit tempora atque commodi quae cupiditate. Cumque dolore,
                      distinctio, commodi architecto molestiae velit voluptates
                      veritatis blanditiis necessitatibus voluptas labore
                      nostrum voluptatum. Expedita.
                      {user ? (
                        <>
                          <p style={{ marginTop: "20px" }}>
                            {"Name : " + user.name}
                          </p>
                          <p>{"Email : " + user.email}</p>
                          <p style={{ marginBottom: "20px" }}>
                            {"Phone : " + user.phone}
                          </p>
                        </>
                      ) : null}
                      <button
                        className="btn"
                        disabled={loading}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={logout}
                      >
                        {loading ? (
                          <img src="/assets/img/icons/loading.gif" width={30} />
                        ) : (
                          "Logout"
                        )}
                      </button>
                    </div>
                  )}

                  {activeTab === "address" && (
                    <Address setActiveTab={setActiveTab} />
                  )}
                  {activeTab === "orders" && <ProfileOrders />}
                  {activeTab === "addressadd" && (
                    <AddressAdd setActiveTab={setActiveTab} />
                  )}

                  {activeTab === "wishList" && (
                    <div className="tab-cont" id="profile-tab_3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cumque tempore saepe blanditiis omnis. Reprehenderit
                      officia atque facere tempora, neque quaerat et aliquid
                      tempore mollitia, nemo, minima iste placeat cupiditate
                      odio?
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        /> */}
      </div>
      {/* <!-- PROFILE EOF   --> */}
    </>
  );
};

export default withAuth(Profile);
