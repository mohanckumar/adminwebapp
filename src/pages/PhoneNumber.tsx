import React, { useState } from "react";
import { supabaseClient } from "../supabaseClient";


import { useNavigate } from "react-router-dom";
 
const EnterPhoneNumber = () => {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
 
  const handleContinue = async () => {
    if (!phone.trim()) {
        alert("Please enter a valid phone number.");
      return;
    }
 
    if (phone.trim().length < 10) {
        alert("Phone number must be at least 10 digits.");
      return;
    }
 
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        phone,
      });
 
      if (error) {
        alert("Error sending OTP. Please try again.");
        return;
      }
 
      navigate("/OTPScreen", { state: { phoneNumber: phone } });
    } catch (err) {

    }
  };
 
  return (
<div style={{ maxWidth: 300, margin: "0 auto", padding: 20 }}>
<label htmlFor="phone">enterNumber</label>
<input
        id="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone("+91 9611130525")}
        placeholder="+91 9611130525"
        style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16 }}
      />
<button onClick={handleContinue} style={{ width: "100%", padding: 10 }}>
       continue
</button>
</div>
  );
};
 
export default EnterPhoneNumber;