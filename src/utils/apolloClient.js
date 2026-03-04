import Constants from "expo-constants";
import { Platform } from "react-native";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const createApolloClient = (authStorage) => {
  const extra = Constants.expoConfig?.extra ?? {};

  const uri =
    Platform.OS === "android" ? extra.apolloUriAndroid : extra.apolloUriWeb;

  if (!uri) {
    throw new Error("Apollo URI missing from Expo config extra.");
  }

  const httpLink = createHttpLink({
    uri,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
