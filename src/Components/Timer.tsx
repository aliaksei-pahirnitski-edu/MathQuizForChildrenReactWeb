import React, { useEffect, useState } from "react";

export function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  const formatMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
  const formatRestSeconds = restSeconds < 10 ? "0" + restSeconds : restSeconds.toString();
  return `${formatMinutes}:${formatRestSeconds}`;
}

const Timer = (props: { informElapsedSeconds?: (seconds: number) => void }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [startTime] = useState(() => Date.now());
  useEffect(() => {
    function tick() {
      const elapsedMillis = Date.now() - startTime;
      const newElapsedSeconds = Math.floor(elapsedMillis / 1000);
      setElapsedSeconds(newElapsedSeconds);
      if (props.informElapsedSeconds) props?.informElapsedSeconds(newElapsedSeconds);
    }

    const intervalId = setInterval(tick, 900);
    return () => clearInterval(intervalId);
  }, [startTime]);

  return <span style={{ fontStyle: "italic" }}>{formatSeconds(elapsedSeconds)}</span>;
};

export default Timer;
