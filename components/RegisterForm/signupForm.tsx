import React from "react";

export default function SignUp() {
  return (
    <div style={{ width: "1512px", height: "982px", background: "#E9E9E9" }}>
      <div
        style={{
          display: "flex",
          width: "355px",
          height: "67px",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: "0",
          color: "#000",
          textAlign: "center",
          fontFamily: "Poppins",
          fontSize: "50px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
        }}
      >
        Register
      </div>
      <div>
        <label
          htmlFor="email"
          style={{
            display: "flex",
            width: "81.581px",
            height: "25px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: "0",
            color: "#000",
            fontFamily: "Poppins",
            fontSize: "25px",
            fontStyle: "normal",
            lineHeight: "normal",
          }}
        >
          Email
        </label>
        <input type="email" id="email" name="email" required></input>
        <label
          htmlFor="email"
          style={{
            display: "flex",
            width: "81.581px",
            height: "25px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: "0",
            color: "#000",
            fontFamily: "Poppins",
            fontSize: "25px",
            fontStyle: "normal",
            lineHeight: "normal",
          }}
        >
          Gender
        </label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label
          htmlFor="email"
          style={{
            display: "flex",
            width: "81.581px",
            height: "25px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: "0",
            color: "#000",
            fontFamily: "Poppins",
            fontSize: "25px",
            fontStyle: "normal",
            lineHeight: "normal",
          }}
        >
          Password
        </label>
        <input type="password" id="password" name="password" required></input>
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <div style={{ display: "flex" }}>
          <select id="countryCode" name="countryCode" style={{ width: "30%" }}>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            style={{ width: "70%" }}
            required
          />
        </div>

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" required></input>
        <label
          htmlFor="confirmPassword"
          style={{
            display: "flex",
            width: "81.581px",
            height: "25px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: "0",
            color: "#000",
            fontFamily: "Poppins",
            fontSize: "25px",
            fontStyle: "normal",
            lineHeight: "normal",
          }}
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
        ></input>
      </div>
      <div
        style={{
          width: "30px",
          height: "30px",
          flexShrink: "0",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="28"
            height="28"
            rx="6"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          width: "509px",
          height: "69px",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: "0",
          color: "#002BC5",
          textAlign: "justify",
          fontFamily: "Poppins",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
        }}
      >
        Terms and conditions.
      </div>
      <button
        style={{
          width: "213px",
          height: "66px",
          flexShrink: "0",
          background: "#000",
          borderRadius: "7px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "150px",
            height: "35px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: "0",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "29px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          Register
        </div>
      </button>
    </div>
  );
}
