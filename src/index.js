import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = (...args) => {
  const [socket, setSocket] = useState(io(...args));
  useEffect(() => {
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [socket]);
  return [socket, setSocket];
};

export default useSocket;
