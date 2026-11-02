export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image?: string | undefined;
  coverage?: number;
  productSlug?: string;
};

export function addCartItem(items: CartItem[], incoming: CartItem): CartItem[] {
  const quantity = Math.max(1, Math.floor(incoming.quantity));
  const existing = items.find((item) => item.id === incoming.id);
  if (!existing) return [...items, { ...incoming, quantity }];
  return items.map((item) =>
    item.id === incoming.id ? { ...item, quantity: item.quantity + quantity } : item,
  );
}

export function setCartItemQuantity(items: CartItem[], id: string, quantity: number): CartItem[] {
  if (quantity <= 0) return items.filter((item) => item.id !== id);
  return items.map((item) => (item.id === id ? { ...item, quantity: Math.floor(quantity) } : item));
}

export const cartItemCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);
export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
