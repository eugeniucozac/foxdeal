import { gql } from '@apollo/client';

export const GET_TASKS = gql`
    query GetTasks {
        getTasks {
            id
            name
        }
    }
`;

export const ADD_TASK = gql`
    mutation AddTask($task: TaskInput!) {
        addTask(task: $task) {
            id
            name
        }
    }
`;

export const REMOVE_TASK = gql`
    mutation RemoveTask($id: ID!) {
        removeTask(id: $id) {
            id
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $task: TaskInput!) {
        updateTask(id: $id, task: $task) {
            id
            name
        }
    }
`;