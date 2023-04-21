import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AppNavigator from "./components/navigation/AppNavigator";
import UserStateProvider from "./hooks/useAuth";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

export default function App() {
  return (
    <UserStateProvider>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </UserStateProvider>
  );
}
