"use client";
import React, { useState, useEffect, useContext } from "react";

import styles from "./userlayout.module.css";
import {
  GoSearch,
  GoPlus,
  GoPerson,
  GoMail,
  GoKey,
  GoShield,
} from "react-icons/go";
import UserForm from "./User_Form/UserForm";
import UserCard from "./User_card/UserCard";
import UserFormModal from "./User_form_modal/UserFormModal";
import { AppContext } from "../../_contextApi/AppContextProvider";
import HeaderTopBar from "../elements/header_top_bar/HeaderTopBar";
import StatTab from "../elements/stat_tab/StatTab";

export default function UserLayout(props) {
  const { apiData } = props;
  const { openUserForm } = useContext(AppContext);
  const [users, setUsers] = useState(apiData?.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showForm, setShowForm] = useState(false);

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Calculate stats
  const totalUsers = users.length;
  const superadminCount = users.filter((u) => u.role === "superadmin").length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const employeeCount = users.filter((u) => u.role === "employee").length;
  const activeCount = users.filter((u) => u.isActive).length;

  const handleAddUser = (newUser) => {
    setUsers([
      {
        ...newUser,
        id: Date.now(),
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
      },
      ...users,
    ]);
    setShowForm(false);
  };

  const handleToggleActive = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user,
      ),
    );
  };

  return (
    <div className={styles.main_container}>
      {/* Page Header */}
      <div className={styles.page_header}>
        <HeaderTopBar
          pageTitle="User Management"
          pageSubtitle="Manage system users and their roles"
          btnText="Create User"
          btnClickHandel={openUserForm}
        />

        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <StatTab statNumber={totalUsers} statLabel="Total Users" />
            <StatTab statNumber={adminCount} statLabel="Admins" />
            <StatTab statNumber={employeeCount} statLabel="Employees" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.inner_container}>
        {/* Left Column - User List */}
        <div className={styles.userlist_column}>
          {/* Search and Filter */}
          <div className={styles.search_filter_container}>
            <div className={styles.search_wrapper}>
              <GoSearch className={styles.search_icon} />
              <input
                type="text"
                placeholder="Search users..."
                className={styles.search_input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className={styles.role_filter}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Users List */}
          <div className={styles.users_list}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <UserCard
                  key={index}
                  user={user}
                  onToggleActive={handleToggleActive}
                />
              ))
            ) : (
              <div className={styles.no_users}>
                <p>No users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Create User Form */}
        <div className={styles.createuser_column}>
          <div className={styles.form_container}>
            {!showForm ? (
              <div className={styles.add_user_prompt}>
                <p>Click the button below to add a new user</p>
                <button
                  className={styles.add_user_btn}
                  onClick={() => setShowForm(true)}
                >
                  <span className={styles.add_icon}>+</span>
                  Add New User
                </button>
              </div>
            ) : (
              <>
                <div className={styles.form_header}>
                  <h3 className={styles.form_title}>Create New User</h3>
                  <button
                    className={styles.close_btn}
                    onClick={() => setShowForm(false)}
                  >
                    ✕
                  </button>
                </div>
                <UserForm onSubmit={handleAddUser} />
              </>
            )}
          </div>
        </div>
      </div>
      <UserFormModal onSubmit={handleAddUser} />
    </div>
  );
}
