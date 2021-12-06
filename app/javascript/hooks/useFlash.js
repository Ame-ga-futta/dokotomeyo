import { useState } from "react";

const useFlash = () => {
  const [flashMessage, setFlashMessage] = useState("");

  const bookFlashMessage = (message) => {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(), 3000);
  };

  return { flashMessage, bookFlashMessage };
};

export default useFlash;
