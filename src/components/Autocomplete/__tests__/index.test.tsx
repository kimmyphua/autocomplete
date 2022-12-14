import { render, screen, waitFor } from "@testing-library/react";
import Autocomplete from "../index";

describe("Autocomplete", () => {
 it("should show settings", async () => {
  render(<Autocomplete />);
 });
});
