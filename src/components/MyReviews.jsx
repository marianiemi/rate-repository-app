import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import useCurrentUser from "../hooks/useCurrentUser";

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

const ReviewItem = ({ review, onPress }) => {
  return (
    <Pressable onPress={() => onPress(review.repository.id)}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {review.rating}
          </Text>
        </View>

        <View style={styles.reviewContent}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.dateText}>
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useCurrentUser(true);

  if (loading || !currentUser) {
    return null;
  }

  const reviews = currentUser.reviews
    ? currentUser.reviews.edges.map((edge) => edge.node)
    : [];

  const onReviewPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} onPress={onReviewPress} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
