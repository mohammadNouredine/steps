import React from "react";
import InfoPopup from "./InfoPopup";

function OutOfStockPopup({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <InfoPopup
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      title="Not Available!"
      subtitle="This product is out of stock"
      message="This product will be available soon, if you want to buy it , please contact us"
      messageTone="danger"
    />
  );
}

export default OutOfStockPopup;
