import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { auth, storage, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const [url, setUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJaDn7Vmy8w0uaXt5Zma1tWcPZfXpvSA8Kd8B-qILghPJLnrEFnshHFmsZqv3mjIrYVw&usqp=CAU"
  );
  const handlesubmit = async (e) => {
    e.preventDefault();
    
   
   
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file =  e.target[3].files[0]  ;
    
    if (file===undefined) {
      setError("Please upload An Avatar");
      return;
    }
    
   try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            setUrl(downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
         
  
            
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"userChats",res.user.uid),{});
         
           
           
          });
        }
      );
    
      navigate("/");
     setError("");
      
    } catch (e) {
      setError(e);
    }
  
  };
  return (
    <div className="register">
      <div className="container">
        <h1>Chat.io</h1>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            required
           
            placeholder="Display Name"
          />
          <input type="text"  required placeholder="Email" />

          <input type="password" required placeholder="Password" />

          <input style={{ display: "none" }}   type="file" id="file" />
          <label htmlFor="file">
            <img src={url} alt="" />
            <span>Add Avatar</span>
          </label>
          <button>Register</button>
          {error && (
            <span style={{ fontSize: "12px", padding: "1rem 2rem" }}>
              {error.toString()}
            </span>
          )}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
