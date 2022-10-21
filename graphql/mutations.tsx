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
}`;

const CREATE_TASK_MUTATION = gql`
mutation CreateTask($title: String!, $tasksListID: ID!, $date: String!, $deadline: String, $note: String) {
    createTask(title: $title, tasksListID: $tasksListID, date: $date, deadline: $deadline, note: $note) {
        id
        date
        title
        deadline
        note
        isCompleted
        tasksList {
            id
            progress
            tasks {
                date
                title
                deadline
                note
                isCompleted
                id
            }
        }
    }
}`;

const UPDATE_TASK_MUTATION = gql`
mutation UpdateTask($taskID: ID!, $title: String, $deadline: String, $note: String, $isCompleted: Boolean) {
    updateTask(id: $taskID, title: $title, deadline: $deadline, note: $note, isCompleted: $isCompleted) {
        isCompleted
        title
    }
}`;

const DELETE_TASK_MUTATION = gql`
mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
}`;

// add friend to view own tasks list
const ADD_TASKS_LIST_USER_MUTATION = gql`
mutation AddTasksListUser($tasksListID: ID!, $userEmail: String!) {
    addTasksListUser(tasksListID: $tasksListID, userEmail: $userEmail) {
        id
    }
}`;

export { SIGN_UP_MUTATION, SIGN_IN_MUTATION, CREATE_TASK_MUTATION, CREATE_TASKS_LIST_MUTATION, UPDATE_TASK_MUTATION, DELETE_TASK_MUTATION, ADD_TASKS_LIST_USER_MUTATION };

