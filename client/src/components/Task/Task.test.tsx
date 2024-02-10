import { render, screen, fireEvent } from "@testing-library/react";
import { ApolloError } from '@apollo/client';
import Task from "./Task";
import { useUpdateTask } from "../../gql/useUpdateTask";
import { useRemoveTask } from "../../gql/useRemoveTask";

jest.mock("../../gql/useRemoveTask", () => ({
    useRemoveTask: jest.fn(),
}));

jest.mock("../../gql/useUpdateTask", () => ({
    useUpdateTask: jest.fn(),
}));

describe("<Task />", () => {
    const mockError = new ApolloError({
        errorMessage: 'An error occurred',
    });

    beforeEach(() => {
        jest.clearAllMocks();

        (useRemoveTask as jest.Mock).mockReturnValue({
            removeTask: jest.fn(),
        });
        (useUpdateTask as jest.Mock).mockReturnValue({
            updateTask: jest.fn(() => Promise.resolve()),
            error: mockError,
        });
    });
    
    it("renders the task with the correct name", () => {
        const mockTask = { id: "1", name: "Test Task", tasks: [] };
        render(<Task {...mockTask} />);
        expect(screen.getByText("Test Task")).toBeInTheDocument();
    });

    it("enters edit mode when edit button is clicked", () => {
        const mockTask = { id: "1", name: "Test Task", tasks: [] };
        render(<Task {...mockTask} />);

        fireEvent.click(screen.getByLabelText("edit"));
        expect(screen.getByLabelText("Edit task")).toBeInTheDocument();
        expect(screen.getByLabelText("update")).toBeInTheDocument();
    });

    it("calls updateTask when form is submitted", async () => {
        const updateTask = jest.fn(() => Promise.resolve());

        jest.mocked(useUpdateTask).mockReturnValue({ updateTask } as any);

        const mockTask = { id: "1", name: "Test Task" };
        render(<Task {...mockTask} />);
        
        fireEvent.click(screen.getByLabelText("edit"));
        fireEvent.change(screen.getByLabelText("Edit task"), { target: { value: "Updated Task" } });
        fireEvent.click(screen.getByLabelText("update"));

        expect(updateTask).toHaveBeenCalledWith("1", { name: "Updated Task" });
    });

    it("calls removeTask when delete button is clicked", () => {
        const removeTask = jest.fn();
        jest.mocked(useRemoveTask).mockReturnValue({ removeTask });

        const mockTask = { id: "1", name: "Test Task", tasks: [] };
        render(<Task {...mockTask} />);

        fireEvent.click(screen.getByLabelText("delete"));
        expect(removeTask).toHaveBeenCalledWith("1");
    }); 
});
