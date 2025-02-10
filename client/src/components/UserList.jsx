import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, fetchUsers } from "../features/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { items: users, loading } = useSelector((state) => state.users);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user); // Store current user data for editing
  };

  const handleSaveClick = async () => {
    if (editedUser.id) {
      await dispatch(updateUser(editedUser));
      dispatch(fetchUsers()); // Refresh user list after update
    }
    setEditingUserId(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user.id ? (
                  <select
                    value={editedUser.role}
                    onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user.id ? (
                  <button
                    onClick={handleSaveClick}
                    className="px-2 py-1 text-green-500 hover:bg-green-100 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(user)}
                    className="px-2 py-1 text-blue-500 hover:bg-blue-100 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
