import { useCheckoutStore } from "@/store/cart/useCheckoutStore";
import React from "react";

const AddressDetails = () => {
  const { formDetails } = useCheckoutStore();
  const { deliveryAddress, notes, phoneCode, phoneNumber, fullName } =
    formDetails;
  return (
    <div className="p-4 bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] rounded mt-4">
      <div className="text-lg font-semibold text-gray-800">Address Details</div>
      <div className="mt-2 text-gray-700">
        <p className="flex justify-between">
          Full Name <span className="font-semibold">{fullName}</span>
        </p>
        <p className="flex justify-between">
          Phone Number{" "}
          <span className="font-semibold">
            {phoneCode} {phoneNumber}
          </span>
        </p>
        {deliveryAddress && (
          <p className="flex justify-between">
            Address <span className="font-semibold">{deliveryAddress}</span>
          </p>
        )}
        {notes && (
          <p className="mt-2 text-green-600 flex justify-between">
            Notes <span className="font-bold">{notes}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressDetails;
