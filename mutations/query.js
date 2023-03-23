import { gql } from "@apollo/client";

const USER = gql`
  query user($email: String!) {
    user(email: $email) {
      email
      groceryList
      reminders {
        reminder
        reminderHeader
      }
    }
  }
`;

export { USER };
