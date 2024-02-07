import { useMutation } from '@apollo/client';
import { ADD_TASK, GET_TASKS } from './graphqlOperations';
import { TaskInput } from './types';

export function useAddTask() {
    const [addTaskMutation, { data, loading, error }] = useMutation(ADD_TASK, {
        refetchQueries: [
            { query: GET_TASKS },
        ],
    });

    const addTask = async (task: TaskInput) => {
        await addTaskMutation({ variables: { task } });
    };

    return { addTask, data, loading, error };
}