import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />,
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]'),
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]'),
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]'),
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]'),
  ).toBeInTheDocument();
});

it("should test snapshot and smoke test", () => {
  const { asFragment, getByText, getByTestId } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />,
  );
  expect(asFragment).toMatchSnapshot();
});

it("should display next img", () => {
  const { getByText, getByTestId } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />,
  );
  const h4 = getByText("testing image 1");
  const right_btn = getByTestId("right-btn");
  const left_btn = getByTestId("left-btn");

  fireEvent.click(right_btn);
  expect(h4).toHaveTextContent("testing image 2");
  expect(h4).not.toHaveTextContent("testing image 1");

  fireEvent.click(left_btn);
  expect(h4).not.toHaveTextContent("testing image 2");
  expect(h4).toHaveTextContent("testing image 1");
});

it("should not overflow the array of images or negative index", () => {
  const { getByText, getByTestId } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />,
  );
  const h4 = getByText("testing image 1");
  const right_btn = getByTestId("right-btn");
  const left_btn = getByTestId("left-btn");

  fireEvent.click(left_btn);
  expect(h4).toHaveTextContent("testing image 1");
  fireEvent.click(right_btn);
  expect(h4).toHaveTextContent("testing image 2");
  expect(h4).not.toHaveTextContent("testing image 1");
  fireEvent.click(right_btn);
  expect(h4).toHaveTextContent("testing image 3");
  expect(h4).not.toHaveTextContent("testing image 2");

  fireEvent.click(right_btn);
  expect(h4).toHaveTextContent("testing image 3");
});
