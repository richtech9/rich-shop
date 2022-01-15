import React from "react";

function Address() {
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
        <a
          className="btn btn-dark btn-rounded btn-sm ml-lg-2"
          href="/user/address/add"
          style={{
            height: "40px",
            padding: "0 10px",
            lineHeight: "40px",
            fontSize: "12px",
            marginRight: "10px",
          }}
        >
          Add New Address
        </a>
      </div>
      <table className="shop-table wishlist-table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>
              <span>Address</span>
            </th>
            <th>
              <span>Region</span>
            </th>
            <th>
              <span>Phone</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: "center" }}>
            <td className="product-name">
              <span>hhtmt</span>
            </td>
            <td className="product-name">
              <span>Khulna - Meherpur - Meherpur Sadar</span>
            </td>
            <td className="product-stock-status">
              <span className="wishlist-in-stock">htrh</span>
            </td>
            <td className="wishlist-action">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  className="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0"
                  style={{
                    height: "40px",
                    padding: "0 10px",
                    lineHeight: "40px",
                    fontSize: "12px",
                    marginRight: "10px",
                  }}
                >
                  Make Defualt
                </a>
                <a
                  className="btn btn-dark btn-rounded btn-sm ml-lg-2 btn-cart"
                  style={{
                    height: "40px",
                    padding: "0 10px",
                    lineHeight: "40px",
                    fontSize: "12px",
                    marginRight: "10px",
                  }}
                >
                  Delete
                </a>
              </div>
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td className="product-name">
              <span>ফরিদপুর সদর,দক্ষিন টেপাখোলা</span>
            </td>
            <td className="product-name">
              <span>Rajshahi - Bogura - Shariakandi</span>
            </td>
            <td className="product-stock-status">
              <span className="wishlist-in-stock">01797842991</span>
            </td>
            <td className="wishlist-action">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "rgb(51, 51, 51)" }}>
                  Default Shipping Address Default Billing Address
                </span>
                <a
                  className="btn btn-dark btn-rounded btn-sm ml-lg-2 btn-cart"
                  style={{
                    height: "40px",
                    padding: "0 10px",
                    lineHeight: "40px",
                    fontSize: "12px",
                    marginRight: "10px",
                  }}
                >
                  Delete
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Address;
