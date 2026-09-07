import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../api";

export default function VerifyEmail() {
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false); // Prevent double verification

  useEffect(() => {
    const verifyEmail = async () => {
      // Prevent duplicate requests in React StrictMode
      if (hasVerified.current) return;
      hasVerified.current = true;

      const token = searchParams.get("token");
      console.log("Token from URL:", token);

      if (!token) {
        setStatus("error");
        setMessage("No verification token provided.");
        return;
      }

      try {
        console.log("Sending request to:", `/auth/verify/${token}`);
        const res = await API.get(`/auth/verify/${token}`);
        console.log("Response:", res.data);
        setStatus("success");
        setMessage(res.data.msg);
      } catch (err) {
        console.error("Verification error:", err);
        console.error("Error response:", err.response?.data);
        setStatus("error");
        setMessage(err.response?.data?.msg || "Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div style={container}>
      <div style={card}>
        {status === "loading" && (
          <>
            <div style={spinner}></div>
            <h3>Verifying Email...</h3>
            <p style={{ color: "#666" }}>Please wait while we verify your email address.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={successIcon}>✓</div>
            <h3 style={{ color: "#4CAF50" }}>Email Verified Successfully!</h3>
            <p style={{ color: "#666" }}>{message}</p>
            <button onClick={() => navigate("/")} style={loginButton}>
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div style={errorIcon}>✕</div>
            <h3 style={{ color: "#f44336" }}>Verification Failed</h3>
            <p style={{ color: "#666" }}>{message}</p>
            <button onClick={() => navigate("/signup")} style={signupButton}>
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
};

const card = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  maxWidth: "400px",
  width: "100%",
};

const spinner = {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #4CAF50",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
  margin: "0 auto 20px",
};

const successIcon = {
  fontSize: "60px",
  color: "#4CAF50",
  marginBottom: "20px",
};

const errorIcon = {
  fontSize: "60px",
  color: "#f44336",
  marginBottom: "20px",
};

const loginButton = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "12px 30px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "20px",
};

const signupButton = {
  backgroundColor: "#2196F3",
  color: "white",
  padding: "12px 30px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "20px",
};
