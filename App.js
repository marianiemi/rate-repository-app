import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

LogBox.ignoreLogs(["cache.diff canonizeResults"]);

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
          <StatusBar style="auto" />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
