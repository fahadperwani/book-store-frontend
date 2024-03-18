import { useContext, createContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { async } from "@firebase/util";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = async (email, password, userName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: userName });
    setUser({ name: result.user.displayName, img: null });
    return result;
  };

  const signIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser({ name: result.user.displayName, img: null });
    return result;
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    setUser({
      name: result.user.providerData[0].displayName,
      img: result.user.providerData[0].photoURL,
    });
  };

  const signout = async () => {
    setUser(null);
    console.log(user);
    signOut(auth).then(() => "Successful");
  };

  const forgetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const setPlan = (plan) => {
    setUser({ ...user, plan });
  };

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        signout,
        user,
        createUser,
        signIn,
        setPlan,
        forgetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
