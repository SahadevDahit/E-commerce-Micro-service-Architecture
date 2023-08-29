"use client"
import React, { useEffect, useState } from 'react';
import { Table, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import Image from "next/image";

interface User {
  _id: string;
  email: string;
  name: string;
  gender: string;
  phoneNumber: string;
  role: string;
  dob: string;
  profileImage: string;
  authenticated: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.server}/users/v1/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setUsers(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleAuthenticationUpdate = async (authenticated: boolean) => {
    if (selectedUser) {
      try {
        await axios.put(
          `${process.env.server}/users/v1/update/${selectedUser._id}`,
          { authenticated },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        // Update the selected user's authenticated status
      setSelectedUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            authenticated: !prevUser.authenticated,
          };
        }
        return null;
      });
        fetchUsers(); // Fetch updated user data
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
     <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
  <Table striped bordered>
    <thead>
      <tr>
        <th>email</th>
        <th>name</th>
        <th>gender</th>
        <th>phoneNumber</th>
        <th>role</th>
        <th>authenticated</th>
      </tr>
    </thead>
    <tbody>
      {users?.map((user) => (
        <tr key={user._id} onClick={() => handleRowClick(user)}>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{user.gender}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.role}</td>
          <td>{user.authenticated.toString()}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>


      {selectedUser && (
        <>
          <Image src={selectedUser.profileImage} alt="" width={100} height={100} />
          <Alert variant="info">
            <p>Email: {selectedUser.email}</p>
            <p>Name: {selectedUser.name}</p>
            <p>Gender: {selectedUser.gender}</p>
            <p>Phone Number: {selectedUser.phoneNumber}</p>
            <p>Role: {selectedUser.role}</p>
            <p>DOB: {selectedUser.dob}</p>
            <p>Authenticated: {(selectedUser.authenticated).toString()}</p>

            <p>
              <Button
                variant="primary"
                className="ml-2"
                onClick={() => handleAuthenticationUpdate(!selectedUser.authenticated)}
              >
                Toggle Authentication
              </Button>
            </p>
          </Alert>
        </>
      )}
    </>
  );
}
