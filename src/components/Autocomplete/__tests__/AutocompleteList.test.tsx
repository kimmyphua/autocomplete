import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockData } from "../mock";
import AutocompleteList from "../AutocompleteList";
import { Country } from "..";

describe("Autocomplete", () => {
 it("should render search input and data", async () => {
  render(<AutocompleteList data={mockData as Country[]} />);
  const searchInput = screen.getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();

  await userEvent.click(searchInput);
  const dominicaOption = screen.getByText("Dominica");
  expect(dominicaOption).toBeInTheDocument();
  await userEvent.click(dominicaOption);
  expect(searchInput).toHaveValue("Dominica");
 });

 it("should show autocomplete suggestions", async () => {
  render(<AutocompleteList data={mockData as Country[]} />);
  const searchInput = screen.getByTestId("search-input");
  await userEvent.click(searchInput);
  await userEvent.type(searchInput, "sin");
  expect(screen.getByTestId("Sint Maarten")).toBeInTheDocument();
  expect(screen.getByTestId("Singapore")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("Singapore"));
  expect(searchInput).toHaveValue("Singapore");
 });

 it("should show message if no suggestions", async () => {
  render(<AutocompleteList data={mockData as Country[]} />);
  const searchInput = screen.getByTestId("search-input");
  await userEvent.click(searchInput);
  await userEvent.type(searchInput, "AKJFNEJQ");
  expect(screen.getByText("Nothing to show :(")).toBeInTheDocument();
  await userEvent.clear(searchInput);
  expect(screen.getByText("Dominica")).toBeInTheDocument();
 });

 it("should be able to use arrow keys and enter to select option", async () => {
  render(<AutocompleteList data={mockData as Country[]} />);
  const searchInput = screen.getByTestId("search-input");
  await userEvent.click(searchInput);
  await userEvent.type(searchInput, "p");
  const suggestionList = screen
   .getByTestId("suggestion-list")
   .querySelectorAll(".itemList");
  if (suggestionList) expect(suggestionList).toHaveLength(7);
  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");
  expect(suggestionList[1]).toHaveClass("activeItem");
  await userEvent.keyboard("{arrowup}");
  expect(suggestionList[0]).toHaveClass("activeItem");
  await userEvent.keyboard("{enter}");
  expect(searchInput).toHaveValue("Palau");
 });

 it("should hide suggestion list when input is not focused and mouse is not within suggestion list", async () => {
  render(<AutocompleteList data={mockData as Country[]} />);
  const searchInput = screen.getByTestId("search-input");
  await userEvent.click(searchInput);
  const suggestionList = screen.getByTestId("suggestion-list");
  await userEvent.hover(suggestionList);
  await userEvent.unhover(suggestionList);
  await userEvent.click(screen.getByText("Search your Country"));
  expect(suggestionList).not.toBeInTheDocument();
 });
});
