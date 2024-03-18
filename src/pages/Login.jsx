import React, { useState } from "react";
import { GoogleButton } from "react-google-button";
import { useUserAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userPic from "../images/user.png";
import "../styles/Login.css";

function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { googleSignIn, signout, createUser, signIn, forgetPassword } =
    useUserAuth();
  const [forget, setForget] = useState(false);
  const { user } = useUserAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!login) setLogin(true);
    setEmail("");
    setPassword("");
  }

  function handleForgetButton(e) {
    e.preventDefault();
    setForget(true);
    setEmail("");
    setPassword("");
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (login) setLogin(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignout() {
    try {
      await signout();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (forget) {
      try {
        await forgetPassword(email);
        setEmail("");
        alert(`Password Reset link has been sent to ${email}`);
        setForget(false);
      } catch (err) {
        alert(err.message);
      }
    } else if (!login) {
      try {
        if (password != confirmpassword)
          return alert("Password doesn't match with Confirm password");
        await createUser(email, password, name);
        navigate("/");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        alert(err.message);
        console.log(err.message);
      }
    } else {
      try {
        await signIn(email, password);
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (err) {
        alert(err.message);
      }
    }
  }

  if (user) {
    return (
      <main className="login">
        <img
          src={user.img ? user.img : userPic}
          className="loggedin-img"
          alt=""
        />
        <p className="loggedin-username">{user.name}</p>
        <p className="loggedin-plan"> {user.plan ? user.plan : "No Plan"} </p>
        <button className="logout-btn" onClick={handleSignout}>
          Log Out
        </button>
      </main>
    );
  } else if (forget) {
    return (
      <main className="login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="header-buttons">
            <button className={login ? "active" : ""} onClick={handleLogin}>
              Login
            </button>
            <button className={!login ? "active" : ""} onClick={handleSignUp}>
              Signup
            </button>
          </div>

          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" id="submit">
            Submit
          </button>
          <button id="with-google" onClick={handleGoogleSignIn}>
            Sign in with google <FaGoogle id="google" />
          </button>
        </form>
      </main>
    );
  } else {
    return (
      <main className="login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="header-buttons">
            <button className={login ? "active" : ""} onClick={handleLogin}>
              Login
            </button>
            <button className={!login ? "active" : ""} onClick={handleSignUp}>
              Signup
            </button>
          </div>

          <div className="inputs">
            {!login && (
              <>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!login && (
              <>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-passwordpassword"
                  autoComplete="off"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            )}
          </div>

          <button type="submit" id="submit">
            Submit
          </button>
          {login && (
            <button id="forget" onClick={handleForgetButton}>
              Forget Password
            </button>
          )}
          <button id="with-google" onClick={handleGoogleSignIn}>
            Sign in with google <FaGoogle id="google" />
          </button>
        </form>
        {/* <GoogleButton onClick={handleSignIn} /> */}
      </main>
    );
  }
}

export default Login;
