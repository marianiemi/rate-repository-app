import { StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  text: {
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ label, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text fontWeight="bold" style={styles.text}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" style={styles.text}>
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;
