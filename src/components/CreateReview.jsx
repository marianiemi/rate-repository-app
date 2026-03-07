import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string(),
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

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit,
  });

  const ownerNameHasError = Boolean(
    formik.touched.ownerName && formik.errors.ownerName,
  );
  const repositoryNameHasError = Boolean(
    formik.touched.repositoryName && formik.errors.repositoryName,
  );
  const ratingHasError = Boolean(formik.touched.rating && formik.errors.rating);
  const textHasError = Boolean(formik.touched.text && formik.errors.text);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ownerNameHasError && styles.inputError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        autoCapitalize="none"
      />
      {ownerNameHasError && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[styles.input, repositoryNameHasError && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        autoCapitalize="none"
      />
      {repositoryNameHasError && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[styles.input, ratingHasError && styles.inputError]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        keyboardType="numeric"
      />
      {ratingHasError && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[styles.input, textHasError && styles.inputError]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        multiline
      />
      {textHasError && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const review = await createReview(values);
    navigate(`/repository/${review.repositoryId}`);
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
