import { render, screen } from "@testing-library/react";
import TaskList from "./List";
import { TaskType } from "../../types";

jest.mock("../Item/Item", () => (props: TaskType) => (
    <div data-testid={`task-item-${props.id}`}>
        Task: {props.name}
    </div>
));

describe("<TaskList />", () => {
    const mockTasks = [
        { id: "1", name: "Task 1" },
        { id: "2", name: "Task 2" },
    ];

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<TaskList tasks={mockTasks}/>);
    });

    it("renders the correct number of tasks", () => {
        const { container } = render(<TaskList tasks={mockTasks} />);
        // eslint-disable-next-line testing-library/no-container
        const taskItems = container.querySelectorAll("[data-testid^='task-item-']");
        expect(taskItems.length).toBe(mockTasks.length);
    });

    it("passes the correct props to each Item component", () => {
        const firstTask = screen.getByText("Task: Task 1");
        expect(firstTask).toBeInTheDocument();
        expect(screen.getByTestId("task-item-1")).toBeInTheDocument();

        const secondTask = screen.getByText("Task: Task 2");
        expect(secondTask).toBeInTheDocument();
        expect(screen.getByTestId("task-item-2")).toBeInTheDocument();
    });
});