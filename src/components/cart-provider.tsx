import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  addCartItem,
  cartItemCount,
  cartSubtotal,
  setCartItemQuantity,
  type CartItem,
} from "@/lib/cart";

const STORAGE_KEY = "home-connect-cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: cartItemCount(items),
      subtotal: cartSubtotal(items),
      addItem: (item) => setItems((current) => addCartItem(current, item)),
      setQuantity: (id, quantity) =>
        setItems((current) => setCartItemQuantity(current, id, quantity)),
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
      clear: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
