import { gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`mutation signUp($email: String!,$password: String!,$name: String!) {
    signUp(input: {
        email: $email,
        password: $password,
        name: $name,
    }) {
        token
        user {
            id
            name
        }
    }
}`;

const SIGN_IN_MUTATION = gql`mutation SignIn($email: String!, $password: String!) {
    signIn(input: {email: $email, password: $password}) {
        token
        user {
            id
            name
            email
        }
    }
}`;

const CREATE_TASKS_LIST_MUTATION = gql`mutation CreateTasksList($recap: String) {
    createTasksList(recap: $recap) {
        id
    }
}`

const CREATE_TASK_MUTATION = gql`
mutation CreateTask($title: String!, $tasksListId: ID!, $date: String!, $deadline: String, $note: String) {
    createTask(title: $title, tasksListID: $tasksListId, date: $date, deadline: $deadline, note: $note) {
        id
        date
        title
        deadline
        note
        isCompleted
        tasksList {
            id
            progress
        }
    }
}`;

export { SIGN_UP_MUTATION, SIGN_IN_MUTATION, CREATE_TASK_MUTATION, CREATE_TASKS_LIST_MUTATION };

