import React from "react";
import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "./RepositoryListContainer";

describe("RepositoryListContainer", () => {
  it("renders repository information correctly", () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor: "test",
        startCursor: "test",
      },
      edges: [
        {
          node: {
            id: "jaredpalmer.formik",
            fullName: "jaredpalmer/formik",
            description: "Build forms in React, without the tears",
            language: "TypeScript",
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: "url",
          },
          cursor: "test",
        },
        {
          node: {
            id: "async-library.react-async",
            fullName: "async-library/react-async",
            description: "Flexible promise-based React data loader",
            language: "JavaScript",
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl: "url",
          },
          cursor: "test",
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />);

    const repositoryItems = screen.getAllByTestId("repositoryItem");
    expect(repositoryItems).toHaveLength(2);

    // repository 1
    expect(screen.getByText("jaredpalmer/formik")).toBeDefined();
    expect(
      screen.getByText("Build forms in React, without the tears"),
    ).toBeDefined();
    expect(screen.getByText("TypeScript")).toBeDefined();

    // repository 2
    expect(screen.getByText("async-library/react-async")).toBeDefined();
    expect(
      screen.getByText("Flexible promise-based React data loader"),
    ).toBeDefined();
    expect(screen.getByText("JavaScript")).toBeDefined();

    // stats (huom: formatCount -> k-muoto)
    expect(screen.getByText("21.9k")).toBeDefined();
    expect(screen.getByText("1.6k")).toBeDefined();
    expect(screen.getByText("1.8k")).toBeDefined();
    expect(screen.getByText("69")).toBeDefined();

    expect(screen.getByText("88")).toBeDefined();
    expect(screen.getAllByText("3")).toHaveLength(2);
    expect(screen.getByText("72")).toBeDefined();
  });
});
