import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/AuthAction";
import {
  selectError,
  selectRegSuccess,
} from "../../redux/reducers/AuthReducer";
import AlertContainer from "../../Components/alerts";
import Image from "../../../src/assets/tv-expert.jpg"; // Adjust the path as needed
import Logo from "../../../src/assets/logo.png";
import GoogleSvg from "../../../src/assets/images/icons/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Authentification/Register.css"; // Ensure CSS path matches and is properly imported
import AlertSuccess from "../../Components/successalert";
const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActionCompleted, setIsActionCompleted] = useState(false);
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const isSuccess = useSelector(selectRegSuccess);

  const submitHandler = async (e) => {
    e.preventDefault();
    let data;
    if (role === "user") {
      data = await dispatch(
        register({ firstname, lastname, email, password, role })
      );
    } else if (role === "tester") {
      data = await dispatch(register({ companyName, email, password, role }));
    }
    setIsActionCompleted(true);
    const timeoutId = setTimeout(() => {
      if (data) navigate("/login");
    }, 3000); // set the timeout to 3 seconds (3000 milliseconds)

    return () => clearTimeout(timeoutId);
  };
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    console.log("Selected role:", selectedRole);
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Skill Enhancement Visual" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="SKILLRISE Logo" />
          </div>
          <div className="login-center">
            <h2>Join WyplayFeeD</h2>
            <p>Please fill in your details to register</p>
            {error && <AlertContainer error={error} />}
            {isSuccess && <AlertSuccess message={"Registered"} />}
            <form onSubmit={submitHandler}>
              <select
                className="custom-select"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="tester">Tester</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {role && (
                <>
                  {role === "user" && (
                    <>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </>
                  )}
                  {role === "tester" && (
                    <input
                      type="text"
                      placeholder="Tester Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  )}
                </>
              )}
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
              <div className="login-center-buttons">
                <button type="submit">Register</button>
                <button type="button">
                  <img src={GoogleSvg} alt="Register with Google" />
                  Register with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
