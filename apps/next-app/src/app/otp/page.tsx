"use client";

import React, { useRef, useState } from "react";

const OTP_INPUT_LENGTH = 6;
export default function OTP() {
  const [otp, setOtp] = useState(Array(OTP_INPUT_LENGTH).fill(""));
  const otpRef = useRef<HTMLInputElement[]>([]);

  const handleChangeOtp = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    let newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (index < OTP_INPUT_LENGTH - 1) {
      otpRef.current[index + 1]?.focus();
    }
  };

  const handleRemoveOtp = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "Backspace") {
      return;
    }

    if (otp[index]) {
      return;
    }

    if (index > 0) {
      e.preventDefault();

      let newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);

      otpRef.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent) => {
    const pastedValue = e.clipboardData.getData("text");
    console.log(pastedValue);

    if (pastedValue.trim().length > OTP_INPUT_LENGTH) {
      return;
    }

    const valueArray = pastedValue.split("");

    setOtp(valueArray);
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();

    const isOtpComplete = otp.every((item) => item !== "");

    if (!isOtpComplete) {
      alert("Please fill all the OTP fields");
      return;
    }

    console.log(otp.join(""));
  };

  return (
    <>
      <h1>OTP</h1>

      <form onSubmit={handleSubmitOtp}>
        {otp?.map((item, index) => {
          return (
            <input
              maxLength={1}
              key={index}
              type="text"
              placeholder={String(index)}
              value={item}
              onChange={(e) => handleChangeOtp(e, index)}
              ref={(ele) => {
                otpRef.current[index] = ele as HTMLInputElement;
              }}
              onKeyDown={(e) => handleRemoveOtp(e, index)}
              onPaste={handlePasteOtp}
              style={{
                margin: "10px",
                width: "30px",
                height: "30px",
                padding: "10px",
                textAlign: "center",
                fontSize: "25px",
                borderRadius: "8px",
              }}
            />
          );
        })}
        <br />
        <input
          type="submit"
          value="Submit"
          style={{ margin: "10px", padding: "10px", fontSize: "18px" }}
        />
      </form>
    </>
  );
}
