import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { CartContext } from "../../context/CartContext";
import BackButton from "./BackButton";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { firmId, firmName } = useParams();
  const navigate = useNavigate();

  const { updateCartCount } = useContext(CartContext);

  // Fetch products of the firm
  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Product fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  //ADD TO CART FUNCTION
  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok) {
        updateCartCount(); 
        alert("Item added to cart!");
      } else {
        alert(data.error || "Failed to add item");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <TopBar />
      <div style={{ padding: 10, position:"fixed" }}>
        <BackButton />
      </div>

      <section className="productSection">
        <h3 style={{ marginBottom: "15px" }}>{firmName}</h3>

        {/* Loader */}
        {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}

        {/* No products found */}
        {!loading && products.length === 0 && (
          <p style={{ textAlign: "center" }}>No products available.</p>
        )}

        {/* Product List */}
        {products.map((item) => {
          const imageUrl = item.image || "/images/default-food.png";

          return (
            <div className="productBox" key={item._id}>
              <div>
                <strong>{item.productName}</strong>
                <div>₹{item.price}</div>
                <div style={{ fontSize: "14px", opacity: 0.8 }}>
                  {item.description}
                </div>
              </div>

              <div className="productGroup">
                <img
                  src={imageUrl}
                  alt={item.productName}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />

                {/* ADD button */}
                <button
                  className="addButton"
                  onClick={() => addToCart(item._id)}
                  style={{
                    cursor: "pointer",
                    background: "#4fa94d",
                    color: "white",
                    padding: "6px 15px",
                    borderRadius: "6px",
                    border: "none",
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductMenu;
