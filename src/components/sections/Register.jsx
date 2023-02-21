"use client";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'next/navigation';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const router = useRouter();

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
        .then((response) => {
            sessionStorage.setItem('Token', response.user.accessToken)
            console.log(response.user)
            router.push('/')
        })
        .catch(err => {
          alert('Email Already Exists')
      })
  }
  useEffect(() => {
    let token = sessionStorage.getItem('Token')

    if(token){
        router.push('/')
    }
}, [])

    const handleSubmit = (e) => {
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          router.push("/");
          // dispatch({type:"LOGIN", payload:user})
          // navitage("/");
        })
        .catch((error) => {
          setError(true);
        });
    };

  return (
    <div>
    <h1>Register</h1>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button onClick={handleSubmit} type="submit">Login</button>
      <button onClick={signUpWithGoogle}>
                    Sign Up with Google
                </button>
    </form>
  </div>
  );
  
};

export default Login;
