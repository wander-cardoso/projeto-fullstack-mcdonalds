import { useContext, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import CartProductItem from "../../components/cart-product-item";
import FinishOrderDialog from "../../components/finish-order-dialog";
import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[-80%] min-w-[80%] px-1">
        <SheetHeader>
          <SheetTitle className="text-left underline">Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen}/>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
