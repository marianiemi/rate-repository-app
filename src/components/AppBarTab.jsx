import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    color: "white",
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const AppBarTab = ({ text, linkTo, onPress }) => {
  if (linkTo) {
    return (
      <Link to={linkTo} component={Pressable}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
