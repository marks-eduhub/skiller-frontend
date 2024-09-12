import React, { useEffect } from "react";
import { dotPulse } from "ldrs";

const DotPulseWrapper = ({ size = "15", speed = "2.5", color = "white" }) => {
  useEffect(() => {
    dotPulse.register();
  }, []);

  return (
    <l-dot-pulse
      size={size}
      speed={speed}
      color={color}
    ></l-dot-pulse>
  );
};

export default DotPulseWrapper;
