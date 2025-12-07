import { createContext, useState } from "react";
import { API_URL } from "../fudu/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        const total = data.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(total);
      }
    } catch (err) {
      console.log("Cart load failed");
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
