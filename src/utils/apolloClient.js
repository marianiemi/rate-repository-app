import Constants from "expo-constants";
import { Platform } from "react-native";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  const extra = Constants.expoConfig?.extra ?? {};

  const uri =
    Platform.OS === "android" ? extra.apolloUriAndroid : extra.apolloUriWeb;

  if (!uri) {
    throw new Error("Apollo URI missing from Expo config extra.");
  }

  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
