import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
      groceryLists {
        id
        groceryList
      }
      reminders {
        reminderHeader
        reminder
      }
    }
  }
`;

const ADD_REMINDERS = gql`
  mutation addReminders($email: String!, $reminders: Object!) {
    addReminders(email: $email, reminders: $reminders) {
      reminders {
        id
        reminderHeader
        reminder
      }
    }
  }
`;

const ADD_GROCERYLIST = gql`
  mutation addGroceryList($email: String!, $groceryLists: groceryListInput) {
    addGroceryList(email: $email, groceryLists: $groceryLists) {
      groceryLists {
        id
        groceryList
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      groceryLists {
        id
        groceryList
      }
      reminders {
        reminderHeader
        reminder
      }
    }
  }
`;

export { ADD_USER, LOGIN_USER, ADD_REMINDERS, ADD_GROCERYLIST };
