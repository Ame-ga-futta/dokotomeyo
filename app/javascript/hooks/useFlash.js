import { useState } from "react";

const useFlash = () => {
  const [flashMessage, setFlashMessage] = useState("");

  const setAndReturn = (message) => {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(), 3000);
  };

  return { flashMessage, setAndReturn };
};

export default useFlash;
