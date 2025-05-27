import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import SelectField from "@/components/fields/form/SelectField";
import NumberField from "@/components/fields/form/NumberField";
import DateField from "@/components/fields/form/DateField";
import Button from "@/components/common/ui/Button";
import { DashboardPurchasedItem } from "../../_common/types/PurchasedItem";
import { addPurchaseSchema } from "@/app/api/purchase/_dto/mutatePurchase.dto";
import { useCreatePurchase } from "../../api-hookts/purchases/useCreatePurchase";
import { useEditPurchase } from "../../api-hookts/purchases/useEditPurchase";
import { formatDateToDashes } from "@/helpers/formatDate";
import { useGetAllKids } from "../../api-hookts/kids/useGetAllKids";

function AddEditPurchaseModal({
  isOpen,
  setIsOpen,
  editingPurchase,
  setEditingPurchase,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingPurchase?: DashboardPurchasedItem;
  setEditingPurchase: React.Dispatch<
    React.SetStateAction<DashboardPurchasedItem | undefined>
  >;
}) {
  const { data: kidsData } = useGetAllKids();
  const kids = kidsData?.data;
  const kidsOptions = kids?.map((kid) => ({
    value: kid.id,
    label: kid.firstName + " " + kid.lastName,
  }));

  const { mutate: createPurchase, isPending: isCreatingLoading } =
    useCreatePurchase({
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  const { mutate: editPurchase, isPending: isEditingLoading } = useEditPurchase(
    {
      onSuccess: () => {
        setIsOpen(false);
      },
      id: editingPurchase?.id || -1,
    }
  );
  const isEditing = !!editingPurchase?.id;

  return (
    <CenteredModal
      onClose={() => {
        setEditingPurchase(undefined);
      }}
      title={isEditing ? "Edit Purchase" : "Add Purchase"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={addPurchaseSchema}
        initialValues={{
          kidId: editingPurchase?.kidId || 0,
          purchaseDate: editingPurchase?.purchaseDate
            ? formatDateToDashes(editingPurchase?.purchaseDate)
            : formatDateToDashes(new Date()),
          note: editingPurchase?.note || "",
          totalPrice: editingPurchase?.totalPrice || 0,
          paidAmount: editingPurchase?.paidAmount || 0,
        }}
        onSubmit={(values) => {
          if (isEditing) {
            editPurchase(values);
          } else {
            createPurchase(values);
          }
        }}
      >
        <Form>
          <div className="md:grid md:grid-cols-2 gap-4">
            <SelectField
              name="kidId"
              label="Kid"
              data={kidsOptions || []}
              colSpan={2}
            />

            <DateField name="purchaseDate" label="Purchase Date" />
            <InputField name="note" label="Note" />
            <NumberField name="totalPrice" label="Total Price" />
            <NumberField name="paidAmount" label="Paid Amount" />
          </div>
          <Button
            type="button"
            buttonType="submit"
            text={isEditing ? "Update" : "Create"}
            className="mt-4"
            loadingText="Saving..."
            isLoading={isEditingLoading || isCreatingLoading}
          />
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddEditPurchaseModal;
