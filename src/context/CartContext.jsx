import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");

  // TOTAL NUMBER OF ITEMS IN CART
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // ADD PRODUCT TO CART
  function addToCart(product, quantity = 1) {
    setNotification(`${product.name} has been added to your cart.`);

    setTimeout(() => {
      setNotification("");
    }, 2500);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item._id === product._id,
      );

      // Product already exists
      if (existingItem) {
        return currentItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      // New product
      return [
        ...currentItems,
        {
          ...product,
          quantity: quantity,
        },
      ];
    });
  }

  // DECREASE QUANTITY
  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // REMOVE PRODUCT COMPLETELY
  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId),
    );
  }

  // CLEAR ENTIRE CART
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 border border-stone-200 bg-stone-900 px-6 py-4 text-sm text-white shadow-lg">
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
}

export default CartContext;