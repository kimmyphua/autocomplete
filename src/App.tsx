import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "./components/utils";
import Autocomplete from "./components/Autocomplete";
import { useState } from "react";
import Aside from "./components/Aside";
import "./App.css";

function App() {
 const [isDark, setIsDark] = useState<boolean>(true);
 return (
  <NextUIProvider theme={isDark ? darkTheme("dark") : darkTheme("light")}>
   <Aside
    setIsDark={() => {
     setIsDark(!isDark);
    }}
    isDark={isDark}
   />
   <Autocomplete />
  </NextUIProvider>
 );
}

export default App;
