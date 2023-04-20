import { gql } from "@apollo/client";

const USER = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      email
      groceryLists {
        id
        groceryList
      }
      reminders {
        id
        reminder
        reminderHeader
      }
    }
  }
`;

export { USER };
