import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

const TopBar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const isLoggedIn = !!userToken;

  // ⭐ Get global cart count from context
  const { cartCount, updateCartCount } = useContext(CartContext);

  // 🔥 Load cart count whenever user logs in or refreshes
  useEffect(() => {
    if (isLoggedIn) {
      updateCartCount();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <section className="topBarSection">
      <div className="companyTitle">
        <Link to="/" className="link">
          <h2>FUDU</h2>
        </Link>
      </div>

      <div className="searchBar">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="userAuth">

        {/* Cart Icon – only show when logged in */}
        {isLoggedIn && (
          <div
            className="cartIcon"
            onClick={() => navigate("/cart")}
            style={{
              position: "relative",
              cursor: "pointer",
              marginRight: "20px",
            }}
          >
            <FaShoppingCart size={22} />

            {/* Cart badge */}
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  fontSize: "12px",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
        )}

        {/* If NOT logged in */}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="loginBtn">
              Login
            </Link>
            <Link to="/register" className="registerBtn">
              Register
            </Link>
          </>
        )}

        {/* If LOGGED IN */}
        {isLoggedIn && (
          <>
            <Link to="/profile" className="profileBtn">
              Profile
            </Link>
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default TopBar;
