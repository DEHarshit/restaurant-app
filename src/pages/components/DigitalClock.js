import { useState, useEffect } from "react";

const DigitalClock = ({ setTiming }) => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hours = time.getHours();
    let newGreeting;
    if (hours >= 6 && hours < 12) {
      newGreeting = "Morning";
    } else if (hours >= 12 && hours < 15) {
      newGreeting = "Afternoon";
    } else if (hours >= 15 && hours < 21) {
      newGreeting = "Evening";
    } else {
      newGreeting = "Night";
    }
    setGreeting(newGreeting);
    setGreeting("Afternoon");
  }, [time]);

  useEffect(() => {
    setTiming(greeting.slice(0, 1));
  }, [greeting]);

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", { hour12: true });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold">
        <div className="w-[150px]">{formatTime(time)}</div>
      </div>
      <div className="text-md text-zinc-500">{greeting}</div>
    </div>
  );
};

export default DigitalClock;
