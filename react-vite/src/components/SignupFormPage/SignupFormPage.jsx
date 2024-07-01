import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignUpFormPage.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    const errorsObj = {};

    if (touchedFields.email && (!email.includes('@') || email.length < 10)) {
      errorsObj.email = 'Email must have an @ symbol and must be greater than 10 characters';
    }
    if (touchedFields.username && (username.length < 5 || username.length > 40)) {
      errorsObj.username = 'Please create a username that is between 5 and 40 characters';
    }
    if (touchedFields.firstname && (firstname.length < 3 || firstname.length > 25)) {
      errorsObj.firstname = 'Please input your firstname that is between 3 and 25 characters';
    }
    if (touchedFields.lastname && (lastname.length < 3 || lastname.length > 25)) {
      errorsObj.lastname = 'Please input your lastname that is between 3 and 25 characters';
    }
    if (touchedFields.password && password.length < 8) {
      errorsObj.password = 'Please provide a secure password that is greater than 8 characters';
    }
    if (touchedFields.confirmPassword && confirmPassword !== password) {
      errorsObj.confirmPassword = "Confirm Password field must be the same as the Password field";
    }

    setErrors(errorsObj);
    // console.log("Errors:", errorsObj); 
  }, [email, username, firstname, lastname, password, confirmPassword, touchedFields]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    const handleBlur = (field) => {
      setTouchedFields((prev) => ({ ...prev, [field]: true }));
    };
  

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        firstname,
        lastname,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/hello");
    }
  };

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    // console.log("Touched fields:", touchedFields);  
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
<div className="signup-form-container">
  <h1>Sign Up</h1>
  <form onSubmit={handleSubmit} className="signup-form">
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={handleChange(setEmail)}
        onBlur={() => handleBlur('email')}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleChange(setUsername)}
        onBlur={() => handleBlur('username')}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        value={firstname}
        onChange={handleChange(setFirstname)}
        onBlur={() => handleBlur('firstname')}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        value={lastname}
        onChange={handleChange(setLastname)}
        onBlur={() => handleBlur('lastname')}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handleChange(setPassword)}
        onBlur={() => handleBlur('password')}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleChange(setConfirmPassword)}
        onBlur={() => handleBlur('confirmPassword')}
        required
      />
    </div>
    <button className="button-signup" type="submit">Sign Up</button>
  </form>
</div>
  );
}

export default SignupFormPage;