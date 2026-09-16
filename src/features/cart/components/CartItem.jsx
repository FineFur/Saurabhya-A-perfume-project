import { useContext } from "react";
import CartContext from "../../../context/CartContext";

function CartItem({ item }) {
  const { addToCart, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  const itemSubtotal = item.price * item.quantity;

  return (
    <article className="flex gap-6 border-b border-stone-200 py-6">
      {/* Product Image */}
      <div className="h-36 w-28 shrink-0 overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-600">
            {item.category}
          </p>

          <h2 className="mt-2 font-serif text-2xl text-stone-900">
            {item.name}
          </h2>

          <p className="mt-2 text-sm text-stone-700">
            ₹{item.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="mt-6 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQuantity(item._id)}
              className="h-8 w-8 border border-stone-300"
            >
              -
            </button>

            <span className="min-w-5 text-center text-sm">{item.quantity}</span>

            <button
              onClick={() => addToCart(item)}
              className="h-8 w-8 border border-stone-300"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <p className="text-sm">₹{itemSubtotal.toLocaleString("en-IN")}</p>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item._id)}
          className="mt-3 w-fit text-xs uppercase tracking-wider text-stone-600 underline underline-offset-4 hover:text-stone-900"
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
