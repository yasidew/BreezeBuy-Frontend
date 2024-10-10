// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import '../styles/product.css';
// import SideNav from "../components/sidenav";

// function ProductManagement() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // Fetch all products
//   useEffect(() => {
//     axios
//       .get("http://localhost:5030/api/product/")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log("Error retrieving products:", err);
//       });

//     // Fetch all categories
//     axios
//       .get("http://localhost:5030/api/category")
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch((err) => {
//         console.log("Error retrieving categories:", err);
//       });
//   }, []);

//   const handleDeleteClick = (productId) => {
//     axios
//       .delete(`http://localhost:5030/api/product/${productId}`) // Use backticks for string interpolation
//       .then((res) => {
//         setProducts(products.filter((product) => product.id !== productId));
//       })
//       .catch((error) => {
//         console.log("Error deleting product:", error);
//       });
//   };

//   return (
//     <div className="container mt-5 product-management-page">
//       <SideNav />

//       {/* Product Table */}
//       <div className="table-responsive mt-4">
//         <div className="product-management-header">
//           <h1 className="title">Product Management</h1>
//           <Link to="/product/add">
//             <button className="btn btn-primary add-new-btn">+ Add New Product</button>
//           </Link>
//         </div>

//         <h2>Products</h2>
//         <table className="table table-hover table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.name}</td>
//                 <td>{product.quantity}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <Link to={`/product/edit/${product.id}`}> {/* Use backticks for dynamic URL */}
//                     <button className="btn btn-outline-primary btn-sm mx-1">
//                       <i className="fas fa-edit"></i> Edit
//                     </button>
//                   </Link>
//                   <button
//                     className="btn btn-outline-danger btn-sm mx-1"
//                     onClick={() => handleDeleteClick(product.id)}
//                   >
//                     <i className="fas fa-trash"></i> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ProductManagement;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/product.css';
import SideNav from "../components/sidenav";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch all products and categories
  useEffect(() => {
    axios
      .get("http://localhost:5030/api/product/active")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error retrieving products:", err);
      });

    axios
      .get("http://localhost:5030/api/category/all")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("Error retrieving categories:", err);
      });
  }, []);

  // Find category name by categoryId for a given product
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Group products by category
  const groupedProducts = categories.map((category) => ({
    categoryName: category.name,
    products: products.filter((product) => product.categoryId === category.id),
  }));

  const handleDeleteClick = (productId) => {
    axios
      .delete(`http://localhost:5030/api/product/${productId}`) // Use backticks for string interpolation
      .then((res) => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  };

  return (
    <div className="container mt-5 product-management-page">
      <SideNav />

      {/* Product Table */}
      <div className="table-responsive mt-4">
        <div className="product-management-header">
          <h1 className="title">Product Management</h1>
          <Link to="/product/add">
            <button className="btn btn-primary add-new-btn">+ Add New Product</button>
          </Link>
        </div>

        <h2>Products</h2>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupedProducts.map((group) => (
              <React.Fragment key={group.categoryName}>
                <tr>
                  <td colSpan="6">
                    <strong>Category: {group.categoryName}</strong>
                  </td>
                </tr>
                {group.products.length > 0 ? (
                  group.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>
                        <Link to={`/product/edit/${product.id}`}>
                          <button className="btn btn-outline-primary btn-sm mx-1">
                            <i className="fas fa-edit"></i> Edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm mx-1"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No products in this category</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
