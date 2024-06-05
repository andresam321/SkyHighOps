import { useState,useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  useEffect(() => {
    const errorsObj = {}

    if (!email && email.length < 7) errorsObj.email = "Email is required and be more than 7 characters"
    if (!password && password.length < 8) errorsObj.password = 'Password must be 8 or more characters'

    setErrors(errorsObj)
  }, [email, password]) 

  return (
    <>
      <h1>Log In</h1>
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
        {errors.password && <span className="form-errors-login">{errors.password}</span>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <span className="form-errors-login">{errors.password}</span>}
        <button disabled={Object.values(errors).length > 0} className='login-btn-main' type="submit">Log In</button>
        <div>
        <button
          type="submit"
          className="login-btn-demo"
          onClick={() => {
            setEmail("demo@aa.io"), setPassword("password");
          }}
        >
          Login as Demo User
        </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
