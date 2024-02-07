import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { useGetTasks } from "./gql/useGetTasks";
import { useAddTask } from "./gql/useAddTask";
import { useRemoveTask } from "./gql/useRemoveTask";

jest.mock('./gql/useAddTask', () => ({
  useAddTask: jest.fn(),
}));

jest.mock('./gql/useGetTasks', () => ({
  useGetTasks: jest.fn(),
}));

jest.mock('./gql/useRemoveTask', () => ({
  useRemoveTask: jest.fn(),
}));

jest.mock("./components/Form/Form", () => (props: any) => (
  <form onSubmit={props.addTask}>
    <input
      placeholder="Add new task"
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
    <button type="submit">Add</button>
    {props.error && <div>{props.error}</div>}
  </form>
));
jest.mock("./components/List/List", () => ({ tasks }: any) => (
  <div>
    {tasks.map((task: any, index: number) => (
      <div key={task.id} data-testid={`task-${index}`}>
        {task.name}
      </div>
    ))}
  </div>
));

describe("<App />", () => {
  const mockTasks = [
    { id: "1", name: "Task 1" },
    { id: "2", name: "Task 2" },
  ];

  beforeEach(() => {
    (useAddTask as jest.Mock).mockReturnValue({
      addTask: jest.fn().mockResolvedValue({}),
      data: null,
      loading: false,
      error: null,
    });

    (useGetTasks as jest.Mock).mockReturnValue({
      tasks: { getTasks: mockTasks },
      loading: false,
      error: null,
    });

    (useRemoveTask as jest.Mock).mockReturnValue({
      removeTask: jest.fn().mockImplementation((id) => {
        const taskIndex = mockTasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
          mockTasks.splice(taskIndex, 1);
        }
        return Promise.resolve();
      }),
      data: null,
      loading: false,
      error: null,
    });

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />);
  });

  it("renders tasks correctly", () => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("displays an error when trying to add an existing task", async () => {
    fireEvent.change(screen.getByPlaceholderText("Add new task"), { target: { value: "Task 1" } });
    fireEvent.click(screen.getByText("Add"));

    expect(await screen.findByText("This task is exist already")).toBeInTheDocument();
  });

  it("adds a new task when submitting a unique task name", async () => {
    const newTaskName = "Unique Task";
    const addTaskSpy = jest.mocked(useAddTask).mockReturnValue({
      addTask: jest.fn(() => {
        mockTasks.push({ id: "3", name: newTaskName });
        return Promise.resolve();
      }),
      data: null,
      loading: false,
      error: undefined,
    });

    fireEvent.change(screen.getByPlaceholderText("Add new task"), { target: { value: newTaskName } });
    fireEvent.click(screen.getByText("Add"));

    expect(addTaskSpy().addTask).toHaveBeenCalledWith({ name: newTaskName });
  });
});
