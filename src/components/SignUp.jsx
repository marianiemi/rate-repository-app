import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be between 5 and 30 characters")
    .max(30, "Username must be between 5 and 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be between 5 and 50 characters")
    .max(50, "Password must be between 5 and 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
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

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit,
  });

  const usernameHasError = Boolean(
    formik.touched.username && formik.errors.username,
  );
  const passwordHasError = Boolean(
    formik.touched.password && formik.errors.password,
  );
  const passwordConfirmationHasError = Boolean(
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation,
  );

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

      <TextInput
        style={[
          styles.input,
          passwordConfirmationHasError && styles.inputError,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        secureTextEntry
      />
      {passwordConfirmationHasError && (
        <Text style={styles.errorText}>
          {formik.errors.passwordConfirmation}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
