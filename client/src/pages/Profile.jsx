import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = () => {
    axios.put(`http://localhost:5000/users/${id}`, user).then((res) => setUser(res.data));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button onClick={updateProfile} className="bg-green-500 text-white px-4 py-2">Update Profile</button>
    </div>
  );
};
export default Profile;
