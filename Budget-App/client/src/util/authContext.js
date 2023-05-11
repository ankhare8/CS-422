import React, { useState, useEffect, createContext } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut } from "firebase/auth";
  
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";


import {auth, googleProvider, db} from '../config/firebase'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Firebase listener to handle authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup function to unsubscribe from the listener
    return () => {
      unsubscribe();
    };
  }, []);

  
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      // console.log(res);
      // const token = await res.user.getIdToken(true);
      // console.log(token);
      setCurrentUser(res.user);
  
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: res.user.uid,
          name: res.user.displayName,
          authProvider: "google",
          email: res.user.email,
          subscription_tier: "Free",
        });
      }

      return {
        success: "Welcome!"
      }
      
    } catch (err) {
      console.log(err);
      if(err.code !== "auth/popup-closed-by-user"){
        return{
          error: "Unable to sign in with Google at this time"
        }
      }
    }
  };
  


  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if(res.user){
        setCurrentUser(res.user);
      }

      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, {
        uid: res.user.uid,
        name,
        authProvider: "local",
        email,
        subscription_tier: "Free",
      });

      return {
        success: "Account created successfully. Welcome!"
      }
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return {
          error: "User already exists! Sign in with email and password instead"
        }
      }
      return {
        error: "Unable to create account at this time"
      }
    }
  };
  

  const loginWithEmailAndPassword = async (email, password) =>{
    try{
      const userCredential = await signInWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user)
      return {
        success: "Welcome!"
      }
    } catch (err) {
      console.error(err);
      return{
        error: "Invalid username or password"
      }
    }
  }

  const sendPasswordEmail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: "Password recovery link sent"
      }
    } catch (err) {
      console.error(err);
      return{
        error: "Unable to send reset recovery link"
      }
    }
  };

  const logout = async () => {
    try{
      await signOut(auth);
    }catch(err){
      console.log(err)
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{currentUser, 
      signInWithGoogle, 
      loginWithEmailAndPassword,
      registerWithEmailAndPassword, 
      sendPasswordEmail, 
      logout}}>

      {children}
    </AuthContext.Provider>
  );
};
