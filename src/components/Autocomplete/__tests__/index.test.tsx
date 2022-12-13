import { render, screen, waitFor } from "@testing-library/react";
import Autocomplete from "../index";

describe("Autocomplete", () => {
 it("should show settings", async () => {
  let isDark = false;
  const setIsDark = () => !isDark;
  render(<Autocomplete isDark={isDark} setIsDark={setIsDark} />);
  const themeBtn = screen.getByTestId("theme-button");
  expect(themeBtn).toBeInTheDocument();
  expect(themeBtn.textContent).toBe("Dark Theme");
 });
});
