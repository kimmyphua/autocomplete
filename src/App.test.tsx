import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
 it("should toggle themes", async () => {
  render(<App />);
  const asideToggle = screen.getByTestId("aside-toggle-button");
  await userEvent.click(asideToggle);
  const themeBtn = screen.getByTestId("theme-button");
  expect(themeBtn).toBeInTheDocument();
  expect(themeBtn.textContent).toBe("Light Theme");
  await userEvent.click(themeBtn);
  expect(themeBtn.textContent).toBe("Dark Theme");
 });
});
