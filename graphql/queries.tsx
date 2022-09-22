import { gql } from '@apollo/client';

const MY_TASKS_LIST_QUERY = gql`query MyTasksList {
    myTasksList {
        id
        recap
        progress
        owner {
            id
        }
        tasks {
            date
            title
            deadline
            note
            isCompleted
        }
    }
}`;

const GET_TASK_LIST_QUERY = gql`query GetTasksList($id: ID!) {
    getTasksList(id: $id) {
        id
        recap
        access {
            name
            id
        }
        tasks {
            id
            date
            isCompleted
            title
            deadline
            note
        }
    }
}`;

const GET_USER_QUERY = gql`query GetUser($id: ID!) {
    getUser(id: $id) {
        id
        name
        email
        avatar
    }
}`

export { MY_TASKS_LIST_QUERY, GET_TASK_LIST_QUERY, GET_USER_QUERY };