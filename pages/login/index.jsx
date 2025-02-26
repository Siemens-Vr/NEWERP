"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "@/styles/login/login.module.css";

export default function Login() {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // If context is null, show loading or error state
  if (!context) {
    return <div>Loading...</div>;
  }

  const { login } = context;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
      <div className={styles.container}>
        <div
            className="absolute inset-y-0 right-0 w-full md:w-1/2 h-full overflow-hidden flex justify-end items-end z-10">
          {/* Largest Circle (Light Blue) */}
          <div
              className="absolute w-[530px] h-[550px] md:w-[750px] md:h-[750px] lg:w-[1280px] lg:h-[1300px] bg-[#c6eff7] rounded-full top-0 bottom-0 right-[-350px] md:right-[-250px] lg:right-[-700px] m-auto"
              style={{pointerEvents: "none"}}></div>

          {/* Medium Circle (Orange) */}
          <div
              className="absolute w-[480px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[1180px] lg:h-[1200px] bg-[#ff7211] rounded-full top-0 bottom-0 right-[-310px] md:right-[-220px] lg:right-[-650px] m-auto"
              style={{pointerEvents: "none"}}></div>

          {/* Smallest Circle (Teal) */}
          <div
              className="absolute w-[430px] h-[450px] md:w-[650px] md:h-[650px] lg:w-[1120px] lg:h-[1150px] bg-[#1b9392] rounded-full top-0 bottom-0 right-[-280px] md:right-[-200px] lg:right-[-630px] m-auto"
              style={{pointerEvents: "none"}}></div>
        </div>
        <h1 className={styles.heading}>Log In</h1>
        <form onSubmit={handleLogin} className={styles.formContainer}>
          {error && (
              <div className={styles.error}>
                {error}
              </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className={styles.label}>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
            />
          </div>

          {/* Password with Eye Icon */}
          <div className={`mb-4 ${styles.relative}`}>
            <label className={styles.label}>Password</label>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>
          </div>

          <button type="submit" className={styles.button}>
            Log In
          </button>

          <p className={styles.textCenter}>
            Forgot password?{" "}
            <a href="/forgotPassword" className={styles.link}>
              Reset here
            </a>
          </p>
          <p className={styles.textCenter}>
            Don't have an account?{" "}
            <a href="/signup" className={styles.link}>
              Sign up
            </a>
          </p>
        </form>
      </div>
  );
}