import { useGetAllSubscriptionPlans } from "@/app/dashboard/api-hookts/subscriptions/subscription-plans/useGetAllSubscriptionPlans";
import React from "react";
import AddEditSubscriptionPlanModal from "./AddEditSubscriptionPlanModal";
import { FaPlus } from "react-icons/fa";
import SinglePlanCard from "./SinglePlanCard";
function SubscriptionPlans() {
  const { data: subscriptionPlans } = useGetAllSubscriptionPlans();
  console.log(subscriptionPlans);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 ">
        {subscriptionPlans?.map((plan) => (
          <SinglePlanCard key={plan.id} plan={plan} />
        ))}
        <button
          className="flex gap-2 rounded-lg border-primary text-primary border px-4 py-4 items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus />
          <p> Add Plan</p>
        </button>
      </div>

      <AddEditSubscriptionPlanModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default SubscriptionPlans;
