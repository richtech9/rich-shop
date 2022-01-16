import InputBox from "auth/InputBox";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";

function AddressAdd({ setActiveTab }) {
  const {
    state: { user },
  } = useContext(AppContext);
  const [loading, setLoading] = useState({ type: "", load: false });
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const route = useRouter();

  const getData = async (url, setData, type) => {
    setLoading({ type, load: true });

    try {
      const res = await axios.get(url);
      if (res.data) {
        if (res.data.success) {
          setData(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading({ type, load: false });
  };

  const addAddress = async (e) => {
    e.preventDefault();

    let country = "";
    let state = "";
    let city = "";
    let address = "";
    let postal_code = "";
    let phone = "";
    for (let index = 0; index < e.target.length; index++) {
      const v = e.target[index];
      switch (v.name) {
        case "country":
          country = v.value;
          break;
        case "state":
          state = v.value;
          break;
        case "city":
          city = v.value;
          break;
        case "address":
          address = v.value;
          break;
        case "zip":
          postal_code = v.value;
          break;
        case "phone":
          phone = v.value;
          break;
        default:
          break;
      }
    }

    if (
      country != 0 &&
      city != 0 &&
      state != 0 &&
      address &&
      postal_code &&
      phone
    ) {
      setLoading({ type: "s", load: true });
      try {
        const res = await axios.post("user/address/create", {
          country,
          city,
          state,
          address,
          postal_code,
          phone,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          if (route.query.pathname) {
            route.push(route.query.pathname);
          } else {
            setActiveTab("address");
          }
          console.log(res.data);
        } else {
          toast.error("Something wrong try again!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Server error please try again!");
      }
      setLoading({ type: "s", load: false });
    } else {
      toast.error("All input value is required!");
    }
  };

  useEffect(() => {
    getData("all-countries", setCountry, "1");
  }, []);
  return (
    <div>
      <h4>Add new address</h4>
      <div className="registration" style={{ marginTop: "30px" }}>
        <form onSubmit={addAddress}>
          <div className="box-field__row">
            <div className="box-field">
              {/* <InputBox type="text" name="mobile" label="Email address *" /> */}
              <p style={{ marginBottom: "5px" }}>Choose country *</p>
              <select
                className="form-control"
                name="country"
                defaultValue={0}
                onChange={(e) => {
                  getData("states/" + e.target.value, setState, "2");
                  setCity([]);
                }}
                required
              >
                <option value={0} disabled>
                  {loading.load && loading.type == "1"
                    ? "Loading..."
                    : "Choose your country"}
                </option>
                {country.map((v) => (
                  <option value={v.id} key={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="box-field">
              {/* <InputBox type="text" name="mobile" label="Email address *" /> */}
              <p style={{ marginBottom: "5px" }}>Choose state *</p>
              <select
                className="form-control"
                name="state"
                defaultValue={0}
                onChange={(e) => {
                  getData("cities/" + e.target.value, setCity, "3");
                }}
                required
              >
                <option value={0} disabled>
                  {loading.load && loading.type == "2"
                    ? "Loading..."
                    : "Choose your state"}
                </option>
                {state.map((v) => (
                  <option value={v.id} key={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="box-field" style={{ margin: "20px 0" }}>
            <p style={{ marginBottom: "5px" }}>Choose city *</p>
            <select
              className="form-control"
              name="city"
              defaultValue={0}
              required
            >
              <option value={0} disabled>
                {loading.load && loading.type == "3"
                  ? "Loading..."
                  : "Choose your city"}
              </option>
              {city.map((v) => (
                <option value={v.id} key={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="box-field">
            <p style={{ marginBottom: "5px" }}>Enter Address *</p>
            <InputBox
              type="text"
              name="address"
              label="For Example: House# 123, Street# 123, ABC Road"
            />
          </div>

          <div className="box-field__row" style={{ marginTop: "20px" }}>
            <div className="box-field">
              <p style={{ marginBottom: "5px" }}>Postal Code *</p>
              <InputBox type="text" name="zip" label="Postal code*" />
            </div>

            <div className="box-field">
              <p style={{ marginBottom: "5px" }}>Phone number *</p>

              <InputBox type="text" name="phone" label="Phone number*" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              className="btn"
              disabled={loading.load}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading.load && loading.type == "s" ? (
                <img src="/assets/img/icons/loading.gif" width={30} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressAdd;
