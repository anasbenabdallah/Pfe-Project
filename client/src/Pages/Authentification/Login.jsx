import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/AuthAction";
import { selectError, selectSuccess } from "../../redux/reducers/AuthReducer";

// Icons and images
import Image from "../../../src/assets/tv-expert.jpg";
import Logo from "../../../src/assets/logo.png";
import GoogleSvg from "./Google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Authentification/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Error = useSelector(selectError);
  const isSuccess = useSelector(selectSuccess);
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="TV expert" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="WyPlay Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={submitHandler}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <Link to="/forgetpassword" className="forgot-pass-link">
                  Forgot password?
                </Link>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Dont have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
