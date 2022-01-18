import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Address({ setActiveTab }) {
  const [loading, setdLoading] = useState(false);
  const [allAddress, setAlladdress] = useState([]);
  const getAllAddress = async () => {
    setdLoading({ type: "all", load: true });
    try {
      const res = await axios.get("user/addresses");
      if (res.data.success) {
        if (!res.data.data.length) {
          setActiveTab("addressadd");
          toast.warning("Add address first!");
        }
        setAlladdress(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setdLoading({ type: "all", load: false });
  };

  const makeDefaultAddress = async (id) => {
    setdLoading({ type: id + "_m", load: true });
    try {
      const res = await axios.get("user/address/default-shipping/" + id);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setAlladdress(res.data.data);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }

    setdLoading({ type: id + "_m", load: false });
  };
  const deleteAddress = async (id) => {
    setdLoading({ type: id + "_d", load: true });
    try {
      const res = await axios.get("user/address/delete/" + id);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setAlladdress(res.data.data);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }

    setdLoading({ type: id + "_d", load: false });
  };

  useEffect(() => {
    getAllAddress();
  }, []);
  return (
    <div id="account-details">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div className="icon-box icon-box-side icon-box-light">
          <div className="icon-box-content">
            <h4 className="icon-box-title mb-0 ls-normal">Address List</h4>
          </div>
        </div>
        <button
          className="btn btn-dark btn-rounded btn-sm ml-lg-2"
          onClick={() => setActiveTab("addressadd")}
          style={{
            height: "40px",
            padding: "0 10px",
            lineHeight: "40px",
            fontSize: "12px",
            marginRight: "10px",
          }}
        >
          Add New Address
        </button>
      </div>

      <div className="profile-orders" style={{ marginTop: "50px" }}>
        {loading.load && loading.type == "all" ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/img/icons/loading.gif" width={250} />
          </div>
        ) : (
          <>
            <div className="profile-orders__row profile-orders__row-head">
              <div className="profile-orders__col">phone</div>
              <div className="profile-orders__col">address</div>
              <div className="profile-orders__col">action</div>
            </div>

            {allAddress.map((v) => (
              <div className={`profile-orders__item`} key={v.id}>
                <div className="profile-orders__row">
                  <div
                    className="profile-orders__col"
                    style={{ width: "160px", padding: "0 10px" }}
                  >
                    <span className="profile-orders__col-mob">phone</span>
                    <span className="profile-orders__item-price">
                      {v.phone}
                    </span>
                  </div>
                  <div className="profile-orders__col">
                    <span className="profile-orders__col-mob">address</span>
                    <span className="profile-orders__item-addr">
                      {`${v.address}, ${v.city} - ${v.state}, ${v.postal_code}, ${v.country}`}
                    </span>
                  </div>
                  <div
                    className="profile-orders__col"
                    style={{ width: "200px" }}
                  >
                    <span className="profile-orders__col-mob">Action</span>
                    <div style={{ display: "flex" }}>
                      {v.default_shipping ? (
                        <div style={{ marginRight: "10px" }}>
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#333",
                            }}
                          >
                            Default Shipping Address
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#333",
                            }}
                          >
                            Default Billing Address
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => makeDefaultAddress(v.id)}
                          className="btn"
                          style={{
                            height: "40px",
                            padding: "0 10px",
                            lineHeight: "18px",
                            fontSize: "12px",
                            marginRight: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {loading.load && loading.type == `${v.id}_m` ? (
                            <img
                              src="/assets/img/icons/loading.gif"
                              width={30}
                            />
                          ) : (
                            "Make Defualt"
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          window.confirm("Are you sure? delete this address")
                            ? deleteAddress(v.id)
                            : null;
                        }}
                        className="btn"
                        style={{
                          height: "40px",
                          padding: "0 10px",
                          lineHeight: "40px",
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {loading.load && loading.type == `${v.id}_d` ? (
                          <img src="/assets/img/icons/loading.gif" width={30} />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Address;
