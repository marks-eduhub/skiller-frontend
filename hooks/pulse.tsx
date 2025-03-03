import React from "react";
import { dotPulse, ring, jelly, metronome,tailChase } from "ldrs";

type LoaderType = "dotPulse" | "ring" | "jelly" | "tailChase" | "metronome" ; 

dotPulse.register();
ring.register();
jelly.register();
tailChase.register();
metronome.register()


const DotPulseWrapper = ({
  type = "dotPulse",
  size = "20",
  speed = "0.1",
  color = "white",
}: {
  type?: LoaderType;
  size?: string;
  speed?: string;
  color?: string;
}) => {
  return (
    <div>
      {type === "dotPulse" && <l-dot-pulse size={size} speed={speed} color={color} />}
      {type === "ring" && <l-ring size={size} speed={speed} color={color} />}
      {type === "jelly" && <l-square size={size} speed={speed} color={color} />}
      {type === "tailChase" && <l-tail-chase size={size} speed={speed} color={color} />}
      {type === "metronome" && <l-tail-chase size={size} speed={speed} color={color} />}

    </div>
  );
};

export default DotPulseWrapper;

