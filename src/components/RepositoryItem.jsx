import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.itemBackground,
  },
  topRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  languagePill: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  languageText: {
    color: "#ffffff",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    marginBottom: 4,
  },
});

const formatCount = (value) => {
  if (value < 1000) return String(value);
  const rounded = Math.round((value / 1000) * 10) / 10; // 1 desimaali
  return `${rounded}k`;
};

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold" style={styles.statValue}>
      {value}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>
            {item.fullName}
          </Text>

          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>

          <View style={styles.languagePill}>
            <Text fontWeight="bold" style={styles.languageText}>
              {item.language}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Stars" value={formatCount(item.stargazersCount)} />
        <Stat label="Forks" value={formatCount(item.forksCount)} />
        <Stat label="Reviews" value={String(item.reviewCount)} />
        <Stat label="Rating" value={String(item.ratingAverage)} />
      </View>
    </View>
  );
};

export default RepositoryItem;
