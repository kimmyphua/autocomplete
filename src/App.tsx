import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "./components/ui/darkTheme";

import AutocompleteWrapper from "./components/ui/AutocompleteWrapper";
import { useState } from "react";

function App() {
 const [isDark, setIsDark] = useState<boolean>(false);
 return (
  <NextUIProvider theme={isDark ? darkTheme("dark") : darkTheme("light")}>
   <AutocompleteWrapper
    setIsDark={() => {
     setIsDark(!isDark);
    }}
    isDark={isDark}
   />
  </NextUIProvider>
 );
}

export default App;
