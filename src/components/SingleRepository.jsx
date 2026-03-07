import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    flexDirection: "row",
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  dateText: {
    marginTop: 4,
    marginBottom: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGitHubButton />;
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">
          {review.rating}
        </Text>
      </View>

      <View style={styles.reviewContent}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.user.username}
        </Text>
        <Text color="textSecondary" style={styles.dateText}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
