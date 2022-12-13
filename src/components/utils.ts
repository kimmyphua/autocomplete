import { createTheme } from "@nextui-org/react";

export const darkTheme = (color: string) =>
 createTheme({
  type: color,
  theme: {
   colors: {},
  },
 });
