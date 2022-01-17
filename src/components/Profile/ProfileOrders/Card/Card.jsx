export const Card = ({ order, index, onCollapse, active }) => {
  const {
    date,
    payment_type,
    shipping_address: v,
    grand_total,
    delivery_status,
    products: { data },
  } = order;

  return (
    <>
      <div className={`profile-orders__item ${active === index && "active"}`}>
        <div className="profile-orders__row">
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">date</span>
            <span className="profile-orders__item-date">{date}</span>
          </div>
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">Delivery address</span>
            <span className="profile-orders__item-addr">{`${v.phone} - ${v.address}, ${v.city} - ${v.state}, ${v.postal_code}, ${v.country}`}</span>
          </div>
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">amount</span>
            <span className="profile-orders__item-price">${grand_total}</span>
          </div>
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">Status</span>
            <span
              className={`profile-orders__col-${
                delivery_status == "delivered" ? "delivered" : "onway"
              }`}
            >
              {delivery_status}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className="profile-orders__col-btn"
            ></span>
          </div>
        </div>
        <div className="profile-orders__content">
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                {item.name}
                <span>${item.price}</span>
              </li>
            ))}
            <li>
              Payment Methods:
              <span>{payment_type}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
