import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("should test snapshot and smoke test ", () => {
  const { asFragment, getByText } = render(
    <Card caption="test" src="test.com" />,
  );
  expect(asFragment).toMatchSnapshot();
  const h4 = getByText("test");
});
