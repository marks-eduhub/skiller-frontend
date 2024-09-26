import React, { useEffect } from "react";
import { dotPulse } from "ldrs";

const DotPulseWrapper = ({ size = "20", speed = "0.1", color = "white" }) => {
  useEffect(() => {
    dotPulse.register();
  }, []);

  return (
    <div >
    <l-dot-pulse
      size={size}     
      speed= {speed} 
      color= {color}  
    />
  </div>
  );
};

export default DotPulseWrapper;
