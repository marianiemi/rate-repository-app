import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useApolloClient, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-native";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollContainer: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const signedIn = Boolean(data?.me);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <AppBarTab text="Repositories" linkTo="/" />
        {signedIn ? (
          <>
            <AppBarTab text="Create a review" linkTo="/create-review" />
            <AppBarTab text="My reviews" linkTo="/my-reviews" />
            <AppBarTab text="Sign out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab text="Sign in" linkTo="/signin" />
            <AppBarTab text="Sign up" linkTo="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
