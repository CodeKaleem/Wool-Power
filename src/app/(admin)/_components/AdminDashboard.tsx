"use client";

import React, { useState } from "react";
import styles from "../admin/Admin.module.css";
import { logout } from "@/backend/actions/authActions";

import { PRODUCTS } from "@/backend/constants/products";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [users, setUsers] = useState([
    { id: 1, email: "admin@woolpower.com", regDate: "2025-12-01", status: "Online", lastLogin: "2026-01-04 10:00" },
    { id: 2, email: "customer1@gmail.com", regDate: "2025-12-05", status: "Offline", lastLogin: "2026-01-02 15:30" },
    { id: 3, email: "crochet_lover@outlook.com", regDate: "2025-12-10", status: "Offline", lastLogin: "2026-01-01 09:15" },
  ]);

  const handleDeleteUser = (id: number) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Wool Power Admin</h2>
        </div>
        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${activeTab === "products" ? styles.active : ""}`} onClick={() => setActiveTab("products")}>
            Products
          </button>
          <button className={`${styles.navItem} ${activeTab === "users" ? styles.active : ""}`} onClick={() => setActiveTab("users")}>
            Users
          </button>
          <button className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`} onClick={() => setActiveTab("orders")}>
            Orders
          </button>
          <button className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`} onClick={() => setActiveTab("settings")}>
            Settings
          </button>
        </nav>
        <form action={logout} style={{ marginTop: "auto", padding: "1rem 2rem" }}>
          <button className={styles.deleteBtn} style={{ width: "100%" }} type="submit">
            Sign Out
          </button>
        </form>
      </aside>

      <main className={styles.content}>
        {activeTab === "users" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h1 className={styles.title}>User Management</h1>
              <div className={styles.searchBar}>
                <input type="text" placeholder="Search by email..." />
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Email Address</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.regDate}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${user.status === "Online" ? styles.online : styles.offline}`}>{user.status}</span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <button className={styles.deleteBtn} onClick={() => handleDeleteUser(user.id)} disabled={user.email === "admin@woolpower.com"}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h1 className={styles.title}>Product Management</h1>
              <button className={styles.addBtn}>+ Add New Product</button>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>PKR {product.price.toLocaleString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className={styles.editBtn}>Edit</button>
                          <button className={styles.deleteBtn}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === "orders" || activeTab === "settings") && (
          <div className={styles.section}>
             <h1 className={styles.title}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
             <p>The {activeTab} module is being finalized.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
