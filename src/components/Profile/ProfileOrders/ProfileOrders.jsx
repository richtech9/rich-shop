import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card/Card";

export const ProfileOrders = () => {
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const orders = [...orderData];
  const handleCollapse = (indx) => {
    if (active === indx) {
      setActive(-1);
    } else {
      setActive(indx);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    const res = await axios.get("user/orders");
    if (res.data.success) {
      setOrderData(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <div className="profile-orders">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/img/icons/loading.gif" width={250} />
          </div>
        ) : (
          <>
            <div className="profile-orders__row profile-orders__row-head">
              <div className="profile-orders__col">date</div>
              <div className="profile-orders__col">Delivery address</div>
              <div className="profile-orders__col">amount</div>
              <div className="profile-orders__col">Status</div>
            </div>
            {orders.map((order, index) => (
              <Card
                key={index}
                index={index}
                onCollapse={handleCollapse}
                order={order}
                active={active}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};
