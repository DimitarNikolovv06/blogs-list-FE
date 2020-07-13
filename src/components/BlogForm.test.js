import React from "react";
import { render, prettyDOM, fireEvent } from "@testing-library/react";
import { BlogForm } from "./BlogForm";

describe("<BlogForm />", () => {
  const addBlog = jest.fn();
  const component = render(<BlogForm addBlog={addBlog} />);

  test("submit form", () => {
    const form = component.container.querySelector("form");

    const title = component.getByLabelText(/^title/i);
    const author = component.getByLabelText(/^author/i);
    const url = component.getByLabelText(/^url/i);

    fireEvent.change(title, {
      persist: jest.fn(),
      target: { name: "title", value: "testing react app" },
    });
    fireEvent.change(author, {
      persist: jest.fn(),
      target: { name: "author", value: "tester" },
    });
    fireEvent.change(url, {
      persist: jest.fn(),
      target: { name: "url", value: "testcom" },
    });

    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    console.log(addBlog.mock.calls[0][1]);
    expect(addBlog.mock.calls[0][1].author).toEqual("tester");
    expect(addBlog.mock.calls[0][1].title).toEqual("testing react app");
    expect(addBlog.mock.calls[0][1].url).toEqual("testcom");
  });
});
