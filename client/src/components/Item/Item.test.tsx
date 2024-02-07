import { render, screen, fireEvent } from "@testing-library/react";
import Item from "./Item";
import { useUpdateTask } from "../../gql/useUpdateTask";
import { useRemoveTask } from "../../gql/useRemoveTask";

jest.mock("../../gql/useRemoveTask", () => ({
    useRemoveTask: jest.fn(),
}));

jest.mock("../../gql/useUpdateTask", () => ({
    useUpdateTask: jest.fn(),
}));

describe("<Item />", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useRemoveTask as jest.Mock).mockReturnValue({
            removeTask: jest.fn(),
        });
        (useUpdateTask as jest.Mock).mockReturnValue({
            updateTask: jest.fn(),
        });
    });
    
    it("renders the item with the correct name", () => {
        const mockItem = { id: "1", name: "Test Task", tasks: [] };
        render(<Item {...mockItem} />);
        expect(screen.getByText("Test Task")).toBeInTheDocument();
    });

    it("enters edit mode when edit button is clicked", () => {
        const mockItem = { id: "1", name: "Test Task", tasks: [] };
        render(<Item {...mockItem} />);

        fireEvent.click(screen.getByLabelText("edit"));
        expect(screen.getByLabelText("Edit task")).toBeInTheDocument();
        expect(screen.getByLabelText("update")).toBeInTheDocument();
    });

    it("calls updateTask when form is submitted", async () => {
        const updateTask = jest.fn();
        jest.mocked(useUpdateTask).mockReturnValue({ updateTask });

        const mockItem = { id: "1", name: "Test Task", tasks: [] };
        render(<Item {...mockItem} />);

        fireEvent.click(screen.getByLabelText("edit"));
        fireEvent.change(screen.getByLabelText("Edit task"), { target: { value: "Updated Task" } });
        fireEvent.click(screen.getByLabelText("update"));

        expect(updateTask).toHaveBeenCalledWith("1", { name: "Updated Task" });
    });

    it("calls removeTask when delete button is clicked", () => {
        const removeTask = jest.fn();
        jest.mocked(useRemoveTask).mockReturnValue({ removeTask });

        const mockItem = { id: "1", name: "Test Task", tasks: [] };
        render(<Item {...mockItem} />);

        fireEvent.click(screen.getByLabelText("delete"));
        expect(removeTask).toHaveBeenCalledWith("1");
    }); 
});
