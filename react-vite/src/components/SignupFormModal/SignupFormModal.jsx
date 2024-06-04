import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();



  useEffect(() => {
    const errorsObj = {}

    if (!email.includes('@') || email.length < 10) errorsObj.email = 'Email must have an @ symbol and must be greater than 10 characters'
    if (username.length < 5 || username.length > 40) errorsObj.username = 'Please create a username that is between 5 and 40 characters'
    if (firstname.length < 3 || firstname.length > 25) errorsObj.firstname = 'Please input your firstname that is between 3 and 25 characters'
    if (lastname.length < 3 || lastname.length > 25) errorsObj.lastname = 'Please input your lastname that is between 3 and 25 characters'
    if (password.length < 8) errorsObj.password = 'Please provide a secure password that is greater than 8 characters'
    if (confirmPassword != password) errorsObj.confirmPassword = "Confirm Password field must be the same as the Password field"

      setErrors(errorsObj)
  }, [username, firstname, lastname, password, confirmPassword, email])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
}

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
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='form-errors-login'>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='form-errors-login'>{errors.username}</p>}
      <div className='label-container-sign-up'>
        <label>
          First Name{" "}
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className='login-input'
          />{" "}
        </label>
      </div>
        {errors.firstname && <p className='form-errors-login'>{errors.firstname}</p>}
      <div className='label-container-sign-up'>
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className='login-input'
          />
        </label>
        {errors.lastname && <p className='form-errors-login'>{errors.lastname}</p>}
      </div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='form-errors-login'>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className='form-errors-login'>{errors.confirmPassword}</p>}
        <button disabled={Object.values(errors).length > 0} className='login-btn-main' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
