import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";
import { config } from "@/config";

console.log(config.baseURL)

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Move router inside the component

  const ROLE_DASHBOARDS = {
    admin: "/admin/dashboard",
    equipment: "/equipment/dashboard",
    employee: "/employee/dashboard",
    user: "/user/dashboard"
  };


  // Check if user is authenticated on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Only run on client-side
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem("token");
      
          if (!token) {
            setLoading(false);
            return; // Don't redirect automatically, let the protected route handle it
          }
      
          const { data } = await axios.get(`${config.baseURL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(data)
      
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token"); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };
      
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${config.baseURL}/api/auth/login`, { 
        email, 
        password 
      });
  
      console.log(data);
        // Check if approval is required (handled by backend)
    if (data.approvalRequired) {
      router.push("/403"); // Redirect to 403 page
      return { success: false, error: "Your account is not approved." };
    }

  
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);
  
      const decodedToken = jwtDecode(data.accessToken);
  
      // Check if user must change password
      if (decodedToken.isDefaultPassword) {
        router.push("/change-password"); // Redirect to change password page
        return { success: true };
      }
  
  
  
      setUser(data.user);
      console.log(data.user);
  
      // Redirect user based on role
      const dashboardRoute = ROLE_DASHBOARDS[data.user.role] || "/dashboard";
      router.push(dashboardRoute);
  
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  };
  

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  // Provide a default value for the context
  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};