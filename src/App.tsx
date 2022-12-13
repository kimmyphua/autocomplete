import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "./components/utils";
import Autocomplete from "./components/Autocomplete";
import { useState } from "react";

function App() {
 const [isDark, setIsDark] = useState<boolean>(false);
 return (
  <NextUIProvider theme={isDark ? darkTheme("dark") : darkTheme("light")}>
   <Autocomplete
    setIsDark={() => {
     setIsDark(!isDark);
    }}
    isDark={isDark}
   />
  </NextUIProvider>
 );
}

export default App;
