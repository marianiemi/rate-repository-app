import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

LogBox.ignoreLogs(["cache.diff canonizeResults"]);

const apolloClient = createApolloClient();

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
        <StatusBar style="auto" />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
