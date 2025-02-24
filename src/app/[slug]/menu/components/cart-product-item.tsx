import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}
const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity,increaseProductQuantity,
    removeProduct } = useContext(CartContext);
  return (
    /* ABA CARRINHO ESQUERDA */

    <div className="flex items-center justify-between gap-3">
      <div className="relative h-20 w-20 rounded-xl bg-gray-100">
        <Image src={product.imageUrl} alt={product.name} fill />
      </div>
      <div className="space-y-1">
        <p className="text-s max-w-[90%] truncate text-ellipsis">
          {product.name}
        </p>
        <p className="px-1 text-sm font-semibold">
          {formatCurrency(product.price)}
        </p>
        <div className="flex items-center gap-1 text-center">
          {/* QUANTIDADE */}
          <Button
            className="h-7 w-7 rounded-lg"
            variant="outline"
            onClick={() => decreaseProductQuantity(product.id)}
          >
            <ChevronLeftIcon size={14} />
          </Button>
          <p className="w-7 px-1.5 text-xs">{product.quantity} </p>
          <Button
            className="h-7 w-7 rounded-lg"
            onClick={() => increaseProductQuantity(product.id)}
          >
            <ChevronRightIcon size={14} />
          </Button>
        </div>
      </div>
      {/* BOTÃO DELETAR */}
      <Button
        className="relative h-7 w-7 rounded-xl"
        variant="outline"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
