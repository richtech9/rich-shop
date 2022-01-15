import InputBox from "auth/InputBox";
import axios from "axios";
import { SocialLogin } from "components/shared/SocialLogin/SocialLogin";
import router, { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";

export const Registration = () => {
  const { dispatch } = useContext(AppContext);
  const [ferror, setFerror] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const singupSubmit = async (e) => {
    setFerror("");
    e.preventDefault();
    let tar = e.target;
    if (tar[0].value == "") {
      tar[0].focus();
      return setFerror({ type: "fname", msg: "Please enter your full name" });
    }
    if (tar[1].value == "") {
      tar[1].focus();
      return setFerror({
        type: "mobile",
        msg: "Please enter your mobile number",
      });
    }
    if (tar[2].value == "") {
      tar[2].focus();
      return setFerror({ type: "email", msg: "Please enter your email" });
    }
    if (tar[3].value == "") {
      tar[3].focus();
      return setFerror({ type: "password", msg: "Please enter password" });
    }

    setLoading(true);

    try {
      const res = await axios.post("auth/signup", {
        name: tar[0].value,
        phone: tar[1].value,
        email: tar[2].value,
        password: tar[3].value,
      });

      if (res.data.success) {
        toast.success("account successfully created");
        axios.defaults.headers = {
          Authorization: `Bearer ${res.data.access_token}`,
        };
        dispatch({
          type: "LOGIN",
          payload: res.data.user,
        });
        if (router.query.pathname) {
          router.push(router.query.pathname);
        } else {
          router.push("/");
        }
      } else {
        setFerror({ type: "server", msg: res.data.message });
      }
    } catch (error) {
      setFerror({ type: "server", msg: "Server error please try again!" });
    }

    setLoading(false);
  };
  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <div className="login registration">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={singupSubmit}>
              <h3>register now</h3>
              <SocialLogin />

              <div className="box-field">
                <InputBox
                  type="text"
                  name="fname"
                  label="Enter your full name *"
                  error={ferror}
                />
              </div>
              {/* <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your last name'
                  />
                </div> */}

              <div className="box-field__row">
                <div className="box-field">
                  <InputBox
                    type="tel"
                    name="mobile"
                    label="Enter your mobile number *"
                    error={ferror}
                  />
                </div>
                <div className="box-field">
                  <InputBox
                    type="email"
                    name="email"
                    label="Enter your email address *"
                    error={ferror}
                  />
                </div>
              </div>

              {/* <span>password</span> */}
              <div className="box-field">
                <InputBox
                  type="text"
                  name="password"
                  label="Enter your password *"
                  error={ferror}
                />
              </div>
              {/* <div className="box-field">
                 
                  <InputBox
                  type="text"
                  name="cpassword"
                  label="Enter Confirm password *"
                  error={ferror}
                />
                </div> */}

              <label className="checkbox-box checkbox-box__sm">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              {ferror ? (
                ferror.type == "server" ? (
                  <p style={{ color: "red" }}>{ferror.msg}</p>
                ) : null
              ) : null}
              <button
                className="btn"
                type="submit"
                disabled={loading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <img src="/assets/img/icons/loading.gif" width={30} />
                ) : (
                  "registration"
                )}
              </button>
              <div className="login-form__bottom">
                <span>
                  Already have an account?{" "}
                  <a onClick={() => router.push("/login")}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};
