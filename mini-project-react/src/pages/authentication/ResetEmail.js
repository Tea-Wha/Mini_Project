// import React, { useState } from "react";
// import { validateToken, resetPassword } from "./api/passwordReset";

// const PasswordResetPage = ({ token }) => {
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       await resetPassword(token, newPassword);
//       setMessage("Your password has been reset successfully.");
//     } catch (err) {
//       setError("Failed to reset password.");
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Your Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="newPassword">New Password:</label>
//         <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default PasswordResetPage;
