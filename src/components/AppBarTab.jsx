import { Pressable, StyleSheet } from "react-native";
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

const AppBarTab = ({ label }) => {
  return (
    <Pressable style={styles.tab}>
      <Text fontWeight="bold" style={styles.text}>
        {label}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
