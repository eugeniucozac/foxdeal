import { useMutation } from '@apollo/client';
import { GET_TASKS, REMOVE_TASK } from './graphqlOperations';

export function useRemoveTask() {
    const [removeTaskMutation] = useMutation(REMOVE_TASK, {
        refetchQueries: [
            { query: GET_TASKS },
        ],
    });

    const removeTask = async (id: string) => {
        await removeTaskMutation({ variables: { id } });
    };

    return { removeTask };
}