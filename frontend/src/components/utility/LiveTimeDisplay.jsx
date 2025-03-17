import { useState, useEffect } from "react";
import { DateTime } from "luxon";

const LiveTimeDisplay = ({ timeZone }) => {
  const [liveTime, setLiveTime] = useState(
    DateTime.now().setZone(timeZone).toFormat("hh:mm a")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime(DateTime.now().setZone(timeZone).toFormat("hh:mm a"));
      console.log(timeZone);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div>
      <p className="font-mono text-sm text-black opacity-50">{`local time: ${liveTime}`}</p>
    </div>
  );
};

export default LiveTimeDisplay;
