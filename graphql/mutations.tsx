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

export { SIGN_UP_MUTATION, SIGN_IN_MUTATION };

