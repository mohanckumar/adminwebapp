import React, { useState, useRef, useEffect } from "react";
import { supabaseClient } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
 
const OTPScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
 
  useEffect(() => {
    if (location.state && (location.state as any).phoneNumber) {
      setPhone((location.state as any).phoneNumber);
    }
  }, [location.state]);
 
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!/^\d*$/.test(element.target.value)) return;
 
    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);
 
    if (element.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
 
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
 
  const resetOtp = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };
 
  const handleResendCode = async () => {
    if (!phone) {
      alert("phoneNumberMissing");
      return;
    }
    setIsLoading(true);
    resetOtp();
 
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({ phone });
      if (error) {
        alert(error.message);
      } else {
        alert("otpSent");
      }
    } catch (err) {
      alert("unexpectedError");
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      alert("enterCompleteOTP");
      return;
    }
    if (!phone) {
      alert("otpVerificationPhoneNumberMissing");
      return;
    }
 
    setIsLoading(true);
    try {
      const { data, error } = await supabaseClient.auth.verifyOtp({
        phone,
        token: otpCode,
        type: "sms",
      });
 
      if (error || !data?.user) {
        alert("invalidOtp");
        return;
      }
 
      navigate("/dashboard", { state: { userId: data.user.id } });
    } catch (error) {
      alert("unexpectedError");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
<div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
<h2>otp</h2>
<p>verificationCodeSent</p>
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        {otp.map((digit, index) => (
<input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
           // ref={(el) => (inputRefs.current[index] = el)}
            style={{ width: 40, height: 40, fontSize: 24, textAlign: "center" }}
          />
        ))}
</div>
 
      <button onClick={handleResendCode} disabled={isLoading} style={{ marginBottom: 16 }}>
     resendCode
        </button>
      <button onClick={handleSubmit} disabled={isLoading} style={{ width: "100%", padding: 10 }}>
     continue
</button>
      <button onClick={() => navigate("/enter-phone-number")} style={{ width: "100%", padding: 10 }}>
        </button>
</div>
  );
};
 
export default OTPScreen;