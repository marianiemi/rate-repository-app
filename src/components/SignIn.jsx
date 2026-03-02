import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    backgroundColor: theme.colors.itemBackground,
    borderWidth: 1,
    borderColor: "#d0d7de",
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginTop: -6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  const usernameHasError = formik.touched.username && formik.errors.username;
  const passwordHasError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, usernameHasError && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        autoCapitalize="none"
      />
      {usernameHasError && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, passwordHasError && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />
      {passwordHasError && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={() => formik.handleSubmit()}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("SUBMIT", values);

    try {
      const res = await signIn({ username, password });
      console.log("SIGNIN RES", res);
      console.log("TOKEN", res?.data?.authenticate?.accessToken);
    } catch (e) {
      console.log("SIGNIN ERROR", e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
