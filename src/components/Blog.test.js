import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    const blog = {
      author: "Tester",
      id: "5f0b204d03074735f4c8eedf",
      likes: 0,
      title: "testing react app",
      url: "testcom",
      user: {
        name: "Bojo",
        username: "Koncho",
        id: "5f04ea55c184a644d8489c52",
      },
    };

    const mockHandler = jest.fn();

    component = render(<Blog onRemove={mockHandler} blog={blog} />);
  });

  //   test("render content", () => {
  //     const btn = component.container.querySelector("button");
  //     btn.addEventListener("click", mockHandler);
  //       const remBtn = component.getByText("Remove");
  //     fireEvent.click(btn);

  //       console.log(prettyDOM(btn));
  //       component.debug();

  //     expect(component.container).toHaveTextContent("Tester");
  //       expect(el).toBeDefined();
  //     expect(mockHandler.mock.calls).toHaveLength(1);
  //   });

  test("component only displays author and title at first", () => {
    const likesDiv = component.container.querySelector(".likes");

    expect(component.container).not.toHaveTextContent("testcom");

    // console.log(prettyDOM(component.container.querySelector("button")));

    expect(likesDiv).toBe(null);
  });

  test("show likes and url on expand click", () => {
    const btn = component.container.querySelector("button");

    fireEvent.click(btn);
    const likesDiv = component.container.querySelector(".likes");

    // component.debug();

    // console.log(prettyDOM(likesDiv));
    expect(component.container).toHaveTextContent("testcom");
    expect(likesDiv).not.toBe(null);
  });

  test("likes event handler", () => {
    const btn = component.container.querySelector("button");

    fireEvent.click(btn);
    const likesDiv = component.container.querySelector(".likes");

    const like = likesDiv.querySelector("button");
    const mockHandler = jest.fn();

    like.addEventListener("click", mockHandler);

    fireEvent.click(like);
    fireEvent.click(like);

    // console.log(prettyDOM(like));

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
