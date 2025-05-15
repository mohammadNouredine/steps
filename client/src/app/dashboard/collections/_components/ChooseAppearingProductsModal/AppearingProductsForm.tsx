import { SortableList } from "@/components/fields/form/SortableListField";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";

function AppearingProductsForm({
  selectedProducts,
}: {
  selectedProducts: { label: string; value: number }[];
}) {
  useEffect(() => {
    setFieldValue("appearingProducts", selectedProducts);
  }, [selectedProducts]);
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <SortableList name="appearingProducts" />
    </div>
  );
}

export default AppearingProductsForm;
