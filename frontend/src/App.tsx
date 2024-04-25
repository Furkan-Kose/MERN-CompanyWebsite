import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import SplashScreen from "./components/SplashScreen"
import { useEffect, useState } from "react"


function App() {

  const [showSplashscreen, setShowSplashscreen] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (!visited || visited === "false") {
      setTimeout(() => {
        setShowSplashscreen(false);
        sessionStorage.setItem("visited", "true");
      }, 3000);
    } else {
      setShowSplashscreen(false);
    }
  }, []);

  return showSplashscreen ? (
    <SplashScreen />
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App

