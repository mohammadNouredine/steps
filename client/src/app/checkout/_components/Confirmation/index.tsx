import React from "react";
import BackBtn from "@/components/common/layout/BackBtn";
import Items from "./Items";
import AddressDetails from "./AddressDetails";
import Totals from "./Totals";
import { useCartStore } from "@/store/cart/useCartStore";
import { useCheckoutStore } from "@/store/cart/useCheckoutStore";
import { usePostOrder } from "../../../../api/api-hooks/order/usePostOrder";
import { useRouter } from "next/navigation";
import Button from "@/components/common/ui/Button";

function Confirmation({
  setStep,
}: {
  setStep: (step: "details" | "confirmation") => void;
}) {
  const { total, products, resetCart } = useCartStore();
  const { formDetails, reset, setLastReviewDate } = useCheckoutStore();
  const router = useRouter();
  const { mutate: createOrder, isPending } = usePostOrder({
    callBackOnSuccess: () => {
      reset();
      resetCart();
      setLastReviewDate(null);
      router.push("/shop?review=true");
    },
  });
  const handleCreateOrder = () => {
    const data = {
      customer_name: formDetails.fullName,
      customer_address: formDetails.deliveryAddress,
      customer_phone: formDetails.phoneNumber,
      is_delivery: formDetails.hasDelivery,
      has_discount: formDetails.hasDiscount,
      notes: formDetails.notes,
      orderItems: products.map((item) => ({
        quantity: item.quantity,
        id: item.id,
      })),
    };
    createOrder(data);
  };

  return (
    <div>
      <BackBtn onClick={() => setStep("details")} />
      <Items />
      <Totals />
      <AddressDetails />
      <div className="fixed bottom-0 left-0 right-0 z-10  bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] py-3 px-4   font-medium text-lg">
        <div className=" mb-2 pb-2">
          <div className="flex justify-between  ">
            <p className="text-gray-500 font-semibold text-sm">Total</p>
            <p className="text-gray-600 font-semibold text-sm">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>

        <Button
          isLoading={isPending}
          text="أرسل الطّلب"
          loadingText="جار الارسال"
          onClick={handleCreateOrder}
          buttonType="button"
        />
      </div>
    </div>
  );
}

export default Confirmation;
