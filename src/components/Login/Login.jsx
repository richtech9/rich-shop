import InputBox from "auth/InputBox";
import axios from "axios";
import { SocialLogin } from "components/shared/SocialLogin/SocialLogin";
import router, { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";

export const Login = () => {
  const { dispatch } = useContext(AppContext);
  const [ferror, setFerror] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onsubmitLogin = async (e) => {
    setFerror("");
    e.preventDefault();
    let tar = e.target;
    if (tar[0].value == "") {
      tar[0].focus();
      return setFerror({ type: "mobile", msg: "Please enter number or email" });
    }
    if (tar[1].value == "") {
      tar[1].focus();
      return setFerror({
        type: "password",
        msg: "Please enter password",
      });
    }

    setLoading(true);

    try {
      const res = await axios.post("auth/login", {
        email: tar[0].value,
        password: tar[1].value,
      });

      if (res.data.success) {
        toast.success("Successfully login");
        axios.defaults.headers = {
          Authorization: `Bearer ${res.data.access_token}`,
        };
        dispatch({ type: "LOGIN", payload: res.data.user });
        if (router.query.pathname) {
          router.push(router.query.pathname);
        } else {
          router.push("/");
        }
      } else {
        setFerror({ type: "server", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
      setFerror({ type: "server", msg: "Server error please try again!" });
    }

    setLoading(false);
  };
  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className="login">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={onsubmitLogin}>
              <h3>log in with</h3>
              <SocialLogin />

              <div className="box-field">
                <InputBox
                  type="text"
                  name="mobile"
                  label="Email address *"
                  error={ferror}
                />
              </div>
              <div className="box-field">
                <InputBox
                  type="password"
                  name="password"
                  label="Password *"
                  error={ferror}
                />
              </div>
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
                  "log in"
                )}
              </button>

              <div className="login-form__bottom">
                <span>
                  No account?{" "}
                  <a onClick={() => router.push("/registration")}>
                    Register now
                  </a>
                </span>
                <a href="#">Lost your password?</a>
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
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
