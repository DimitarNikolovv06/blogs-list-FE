import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

export default function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  return (
    users && (
      <div className="users">
        <h2>Users</h2>
        <ul>
          {users.map((u, i) => (
            <div key={i}>
              <Link to={`/users/${u.id}`}>{u.username}</Link> {u.blogs.length}
            </div>
          ))}
        </ul>
      </div>
    )
  );
}
