import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { initUsers } from "../reducers/usersReducer";

export function User() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users ? users.find((u) => u.id === id) : null;

  useEffect(() => {
    if (!users) {
      dispatch(initUsers());
    }
  }, [dispatch, users]);

  return (
    <div className="user">
      {user && <h1>{user.username}</h1>}
      <h3>Added Blogs:</h3>
      <ul>
        {user
          ? user.blogs.map((b, i) => <li key={i}>{b.title}</li>)
          : `loading...`}
      </ul>
      {console.log(user)}
    </div>
  );
}
