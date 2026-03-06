import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";
import formatCount from "../utils/formatCount";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
  },
  topRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
  },
});

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{value}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const openGitHub = async () => {
    await Linking.openURL(item.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Stars" value={formatCount(item.stargazersCount)} />
        <Stat label="Forks" value={formatCount(item.forksCount)} />
        <Stat label="Reviews" value={String(item.reviewCount)} />
        <Stat label="Rating" value={String(item.ratingAverage)} />
      </View>

      {showGitHubButton && (
        <Pressable style={styles.button} onPress={openGitHub}>
          <Text fontWeight="bold" style={styles.buttonText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
