import { gql } from "@apollo/client";

const ALL_USERS = gql`
  query getAllUser {
    allUser {
      name
      email
    }
  }
`;

export { ALL_USERS };
