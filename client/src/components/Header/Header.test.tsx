
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("<Header />", () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<Header />);
    });

    it("renders the app bar", () => {
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders the add task icon", () => {
        expect(screen.getByTestId("AddTaskIcon")).toBeInTheDocument(); 
    });

    it("renders the title with correct text", () => {
        expect(screen.getByText("Task Manager")).toBeInTheDocument();
    });
});