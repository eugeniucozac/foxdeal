import { useMutation } from '@apollo/client';
import { GET_TASKS, UPDATE_TASK } from './graphqlOperations';
import { TaskInput } from './types';

export function useUpdateTask() {
    const [updateTaskMutation] = useMutation(UPDATE_TASK, {
        refetchQueries: [
            { query: GET_TASKS },
        ],
    });

    const updateTask = async (id: string, task: TaskInput) => {
        await updateTaskMutation({ variables: { id, task } });
    };

    return { updateTask };
}