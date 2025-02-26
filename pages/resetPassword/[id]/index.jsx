"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const ResetPassword =() => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams()
  const [resetToken, setResetToken] = useState(null);
  // console.log(params)
  // const resetToken = params.id
  const router = useRouter();


  useEffect(() => {
    if (params?.id) {
      setResetToken(params.id);
    }
  }, [params]);

  if (!resetToken) {
    return <p>Loading...</p>; // Avoids errors when params are undefined
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    setLoading(true);

    const res = await fetch(`http://localhost:10600/api/auth/resetPassword/${resetToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({confirmPassword, password }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Password reset successful. You can now log in.");
      router.push("/login");
    } else {
      alert("Failed to reset password.");
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
        <form onSubmit={handlePasswordReset} className="bg-white p-6 rounded-lg shadow-md w-80">
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
  );
}
export default ResetPassword;