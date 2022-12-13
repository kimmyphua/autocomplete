import { NextUIProvider } from "@nextui-org/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { darkTheme } from "./components/utils";

describe("App", () => {
 it("should toggle themes", async () => {
  render(<App />);

  const themeBtn = screen.getByTestId("theme-button");
  expect(themeBtn).toBeInTheDocument();
  expect(themeBtn.textContent).toBe("Dark Theme");
  await userEvent.click(themeBtn);
  expect(themeBtn.textContent).toBe("Light Theme");
 });
});
