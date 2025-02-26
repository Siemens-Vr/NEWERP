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