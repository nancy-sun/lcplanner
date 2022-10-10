import { gql } from '@apollo/client';

// get user info in profile
const GET_USER_QUERY = gql`query GetUser($id: ID!) {
    getUser(id: $id) {
        id
        name
        email
    }
}`;

// get tasks list owned by user
const MY_TASKS_LIST_QUERY = gql`query MyTasksList {
    myTasksList {
        id
        recap
        progress
        owner {
            id
        }
        tasks {
            id
            date
            title
            deadline
            note
            isCompleted
        }
    }
}`;

// get single taskslist by id, to view friend's tasks list
const GET_TASK_LIST_QUERY = gql`query GetTasksList($id: ID!) {
    getTasksList(id: $id) {
        recap
        progress
        tasks {
            id
            date
            isCompleted
            title
            deadline
            note
        }
        owner {
            name
        }
    }
}`;

// get accessible taskslist aka friend list
const GET_ACCESS_TASKS_LIST_QUERY = gql`query GetAccessTasksList {
    getAccessTasksList {
        id
        recap
        progress
        owner {
            id
            name
        }
        tasks {
            date
            isCompleted
            title
            deadline
            note
        }
    }
}`

export { MY_TASKS_LIST_QUERY, GET_TASK_LIST_QUERY, GET_USER_QUERY, GET_ACCESS_TASKS_LIST_QUERY };