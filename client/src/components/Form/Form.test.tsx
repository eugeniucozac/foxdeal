import { render, fireEvent, screen } from "@testing-library/react";
import Form from "./Form";

describe("<Form />", () => {
    let addTask: jest.Mock;
    let setValue: jest.Mock;
    let value: string;

    beforeEach(() => {
        addTask = jest.fn();
        setValue = jest.fn();
        value = "";
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<Form error={{message: ""}} addTask={addTask} setValue={setValue} value={value} />);
    });

    it("renders the form", () => {
        expect(screen.getByLabelText("Add task*")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    });

    it("updates value on user input", () => {
        const input = screen.getByLabelText("Add task*");
        fireEvent.change(input, { target: { value: "New Task" } });
        expect(setValue).toHaveBeenCalledWith("New Task");
    });

    it("calls addTask when the form is submitted with valid input", () => {
        const input = screen.getByLabelText("Add task*");
        const form = screen.getByRole("form");

        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.submit(form);

        expect(addTask).toHaveBeenCalledTimes(1);
    });
});