import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "./components/ui/Autocomplete";
import { mockData } from "./mock";

describe("Autocomplete", () => {
 it("should render search input and data", async () => {
  render(<Autocomplete data={mockData} />);
  const searchInput = screen.getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();

  await userEvent.click(searchInput);
  const dominicaOption = screen.getByText("Dominica");
  expect(dominicaOption).toBeInTheDocument();
  await userEvent.click(dominicaOption);
  expect(searchInput).toHaveValue("Dominica");
 });
});
