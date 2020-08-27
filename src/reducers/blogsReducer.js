import blogService from "../services/blogs";

export const initBlogs = () => async (dispatch) => {
  const data = await blogService.getAll();
  dispatch({ type: "INIT_BLOGS", data });
};

export const postBlog = (blog) => async (dispatch) => {
  const data = await blogService.postBlog(blog);

  dispatch({ type: "POST_BLOG", data });
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);

  dispatch({ type: "DELETE_BLOG", data: id });
};

export const putBlog = (blog) => async (dispatch) => {
  const data = await blogService.putBlog(blog);

  dispatch({ type: "PUT_BLOG", data });
};

export const postCommentToBlog = (id, comment) => async (dispatch) => {
  const data = await blogService.postComment(id, comment);

  dispatch({ type: "POST_COMMENT", data });
};

export const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "POST_BLOG":
      return [...state, action.data];

    case "DELETE_BLOG":
      return [...state.filter((b) => b.id !== action.data)];

    case "PUT_BLOG":
      return [
        ...state.map((b) =>
          b.id !== action.data ? b : { ...b, likes: b.likes + 1 }
        ),
      ];

    case "POST_COMMENT":
      return [...state.map((b) => (b.id === action.data.id ? action.data : b))];

    default:
      return state;
  }
};
