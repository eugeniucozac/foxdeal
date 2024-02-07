import { useQuery } from '@apollo/client';
import { GET_TASKS } from './graphqlOperations';
import { GetTasksData } from './types';

export function useGetTasks() {
    const { data: tasks, loading, error } = useQuery<GetTasksData>(GET_TASKS);
    return { tasks, loading, error };
}