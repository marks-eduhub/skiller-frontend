import React, { useState, useEffect } from "react";
type GreetingProps = {
    username: string;
  };
const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const Greeting = ({ username }: GreetingProps) => {
    const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-black font-semibold text-[20px]">
      {greeting} {username}
    </p>
  );
};

export default Greeting;
