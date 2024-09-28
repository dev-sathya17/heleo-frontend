import { useState, useEffect } from "react";
import "./Users.css";
import { useLoaderData } from "react-router-dom";
import userService from "../../../services/user.service";
import { BounceLoader } from "react-spinners";
// import BACKEND_URL from "../../utils/config";

const Users = () => {
  const { data } = useLoaderData();
  const [users, setUsers] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isAddUser, setAddUser] = useState(false);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (user) => {
    const choice = confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );
    if (choice) {
      setLoading(true);
      userService
        .deleteUser(user._id)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            alert(response.data.message);
            setUsers(users.filter((item) => item._id !== user._id));
          } else {
            alert(response);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          alert(error.message);
        });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    if (isAddUser) {
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
      });
    } else {
      setEditingUser({
        ...editingUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const viewAddUserModal = () => {
    setAddUser(true);
    setModalOpen(true);
  };

  const handleSave = () => {
    setLoading(true);

    userService
      .updateUser(editingUser._id, editingUser)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          alert(response.data.message);
          setEditingUser(null);
          setUsers(
            users.map((user) =>
              user._id === editingUser._id ? editingUser : user
            )
          );
          setModalOpen(false);
        } else {
          alert(response);
        }
      })
      .catch((err) => {
        setLoading(false);

        console.error(err);
      });
  };

  const handleAddUser = () => {
    setLoading(true);
    userService
      .register(newUser)
      .then(({ data, status }) => {
        setLoading(false);
        if (status === 201) {
          alert(data.message);
          setUsers([...users, data.user]);
          setAddUser(false);
          setModalOpen(false);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleClose = () => {
    setAddUser(false);
    setModalOpen(false);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
    });
    setEditingUser(null);
  };

  return (
    <>
      {loading ? (
        <>
          <BounceLoader />
        </>
      ) : (
        <>
          <>
            <div className="users-page">
              <h1>User List</h1>

              <input
                type="text"
                className="search-bar"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearch}
              />

              <button onClick={viewAddUserModal}>Add User</button>

              <div className="user-cards">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <div key={index} className="user-card">
                      {/* <img
                  src={`${BACKEND_URL}/${user.image.replace("\\", "/")}`}
                  alt={user.name}
                  className="user-image"
                /> */}
                      <h2>
                        {user.firstName} {user.lastName}
                      </h2>
                      <p>Email: {user.email}</p>
                      {/* <p>Role: {user.role}</p> */}
                      <p>Mobile: {user.mobile}</p>

                      <div className="user-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No users found.</p>
                )}
              </div>

              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>{isAddUser ? "Add User" : "Edit User"}</h2>
                    <label>
                      First Name:
                      <input
                        type="text"
                        name="firstName"
                        value={
                          isAddUser ? newUser.firstName : editingUser.firstName
                        }
                        onChange={handleFormChange}
                        className="usr-input"
                      />
                    </label>
                    <label>
                      Last Name:
                      <input
                        type="text"
                        name="lastName"
                        value={
                          isAddUser ? newUser.lastName : editingUser.lastName
                        }
                        onChange={handleFormChange}
                        className="usr-input"
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="text"
                        name="email"
                        value={isAddUser ? newUser.email : editingUser.email}
                        onChange={handleFormChange}
                        className="usr-input"
                      />
                    </label>
                    <label>
                      Mobile:
                      <input
                        type="text"
                        name="mobile"
                        value={isAddUser ? newUser.mobile : editingUser.mobile}
                        onChange={handleFormChange}
                        className="usr-input"
                      />
                    </label>
                    {isAddUser && (
                      <label>
                        Password:
                        <input
                          type="password"
                          name="password"
                          value={newUser.password}
                          onChange={handleFormChange}
                          className="usr-input"
                        />
                      </label>
                    )}
                    <div className="modal-actions">
                      <button
                        className="save-btn"
                        onClick={isAddUser ? handleAddUser : handleSave}
                      >
                        Save
                      </button>
                      <button className="close-btn" onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </>
      )}
    </>
  );
};

export default Users;
