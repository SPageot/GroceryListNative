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
  mutation addReminders($email: String!, $reminders: reminderInput) {
    addReminders(email: $email, reminders: $reminders) {
      reminders {
        id
        reminderHeader
        reminder
      }
    }
  }
`;

const UPDATE_REMINDERS = gql`
  mutation updateReminders($email: String!, $reminders: reminderInput) {
    updateReminders(email: $email, reminders: $reminders) {
      reminders {
        id
        reminderHeader
        reminder
      }
    }
  }
`;

const DELETE_REMINDERS = gql`
  mutation deleteReminders($email: String!, $reminders: reminderInput) {
    deleteReminders(email: $email, reminders: $reminders) {
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

const DELETE_GROCERYLIST = gql`
  mutation deleteGroceryList($email: String!, $groceryLists: groceryListInput) {
    deleteGroceryList(email: $email, groceryLists: $groceryLists) {
      groceryLists {
        groceryList
        id
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

export {
  ADD_USER,
  LOGIN_USER,
  ADD_REMINDERS,
  UPDATE_REMINDERS,
  DELETE_REMINDERS,
  ADD_GROCERYLIST,
  DELETE_GROCERYLIST,
};
