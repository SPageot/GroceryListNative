import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
      groceryLists
      reminders {
        reminderHeader
        reminder
      }
    }
  }
`;

const UPDATE_REMINDERS = gql`
  mutation UpdateReminders($email: String!, $reminders: [ReminderInput]) {
    updateReminders(email: $email, reminders: $reminders) {
      reminders {
        reminderHeader
        reminder
      }
    }
  }
`;

const UPDATE_GROCERYLIST = gql`
  mutation updateGroceryList($email: String!, $groceryLists: [[String]]) {
    updateGroceryList(email: $email, groceryLists: $groceryLists) {
      groceryLists
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      name
      email
      groceryLists
      reminders {
        reminderHeader
        reminder
      }
    }
  }
`;

export { ADD_USER, LOGIN_USER, UPDATE_REMINDERS, UPDATE_GROCERYLIST };
