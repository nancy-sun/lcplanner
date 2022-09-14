import { useQuery, gql } from '@apollo/client';

const TASKS_LIST_QUERY = gql`query MyTasksList {
    myTasksList {
        id
        recap
        progress
        access {
            name
        }
    }
}`;

export { TASKS_LIST_QUERY };