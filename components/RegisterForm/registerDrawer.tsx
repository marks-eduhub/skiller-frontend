import React from "react";

export default function RegisterDrawer() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000 51.07%, #101010 100%)",
        backgroundBlendMode: "darken",
        width: "730px",
        height: "982px",
        flexShrink: 0,
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            width: "464px",
            height: "196px",
            padding: "45px 39px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: "41px",
            border: "1px solid #FFF",
            background: "#000",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "386px",
              height: "106px",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "70px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "14px",
            }}
          >
            Skiller
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "386px",
            height: "106px",
            flexDirection: "column",
            justifyContent: "center",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Poppins",
          }}
        >
          Let's Help you, better you.
        </div>
      </div>
      <button
        style={{
          borderRadius: "22px",
          background: "#FFF",
          width: "485px",
          height: "73px",
          flexShrink: 0,
        }}
      >
        Login
      </button>
    </div>
  );
}
