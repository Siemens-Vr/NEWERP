"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Password Validation
  const passwordValidations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@#$%^&*()_+!~]/.test(password),
  };

  const allValid = Object.values(passwordValidations).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!allValid) {
      alert("Password does not meet all requirements!");
      return;
    }

    if (!passwordsMatch) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (res.ok) {
      alert("Signup successful!");
      router.push("/login");
    } else {
      alert("Signup failed! Try again.");
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div
            className="absolute inset-y-0 left-0 w-full md:w-1/2 h-full overflow-hidden flex justify-start items-end z-10">
          {/* Largest Circle (Light Blue) */}
          <div
              className="absolute w-[530px] h-[550px] md:w-[750px] md:h-[750px] lg:w-[1280px] lg:h-[1300px] bg-[#c6eff7] rounded-full top-0 bottom-0 left-[-350px] md:left-[-250px] lg:left-[-700px] m-auto"
          ></div>

          {/* Medium Circle (Orange) */}
          <div
              className="absolute w-[480px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[1180px] lg:h-[1200px] bg-[#ff7211] rounded-full top-0 bottom-0 left-[-310px] md:left-[-220px] lg:left-[-650px] m-auto"
          ></div>

          {/* Smallest Circle (Teal) */}
          <div
              className="absolute w-[430px] h-[450px] md:w-[650px] md:h-[650px] lg:w-[1120px] lg:h-[1150px] bg-[#1b9392] rounded-full top-0 bottom-0 left-[-280px] md:left-[-200px] lg:left-[-630px] m-auto"
          ></div>
        </div>
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md w-96">

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2"/>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2"/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          {/* Password with Eye Icon */}
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2"
            />
            <span className="absolute top-10 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>
          </div>

          {/* Confirm Password with Eye Icon */}
          <div className="mb-4 relative">
            <label className="block text-gray-700">Confirm Password</label>
            <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2"
            />
            <span className="absolute top-10 right-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>
          </div>

          {/* Password Strength Checklist */}
          <div className="mb-4 text-sm text-gray-600">
            <p>Password must contain:</p>
            <ul className="list-disc pl-5">
              <li className={passwordValidations.length ? "text-green-600" : "text-red-600"}>At least 8 characters</li>
              <li className={passwordValidations.uppercase ? "text-green-600" : "text-red-600"}>At least 1 uppercase
                letter
              </li>
              <li className={passwordValidations.lowercase ? "text-green-600" : "text-red-600"}>At least 1 lowercase
                letter
              </li>
              <li className={passwordValidations.number ? "text-green-600" : "text-red-600"}>At least 1 number</li>
              <li className={passwordValidations.specialChar ? "text-green-600" : "text-red-600"}>At least 1 special
                character (@#$%^&*)
              </li>
            </ul>
          </div>

          {/* Password Match Warning */}
          {!passwordsMatch && confirmPassword.length > 0 && (
              <p className="text-red-600 text-sm mb-4">Passwords do not match!</p>
          )}

          {/* Signup Button (Disabled if Password is Weak) */}
          <button type="submit" disabled={!allValid || !passwordsMatch}
                  className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Sign Up
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/pages/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
  );
}
