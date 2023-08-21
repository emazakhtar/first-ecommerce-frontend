import React from "react";
import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";

function AdminProductListPage() {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
}

export default AdminProductListPage;
