import { SubscriptionPlan } from "@prisma/client";
import React from "react";
import { useDeleteSubscriptionPlan } from "@/app/dashboard/api-hookts/subscriptions/subscription-plans/useSubscriptionPlan";
import FalseTruePopup from "@/app/dashboard/_common/components/Popups/FalseTruePopup";

function SinglePlanCard({ plan }: { plan: SubscriptionPlan }) {
  const { mutate: deleteSubscriptionPlan } = useDeleteSubscriptionPlan({
    planId: plan.id,
  });
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      key={plan.id}
      className="border-gray-200  border px-4 py-4 rounded-lg text-gray-800 bg-white"
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{plan.name}</p>
        <p className="text-lg font-bold !mt-0">{plan.price}$</p>
      </div>
      <p className="text-xs text-gray-500">{plan.description}</p>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 ">
          {plan.duration} day{plan.duration > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <button className="text-primary">Edit</button>
          <button className="text-red-500" onClick={() => setIsOpen(true)}>
            Delete
          </button>
        </div>
      </div>
      <FalseTruePopup
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
        onClick={() => deleteSubscriptionPlan({})}
        title="Delete Subscription Plan"
        subtitle="Are you sure you want to delete this subscription plan?"
        messageTone="danger"
      />
    </div>
  );
}

export default SinglePlanCard;
