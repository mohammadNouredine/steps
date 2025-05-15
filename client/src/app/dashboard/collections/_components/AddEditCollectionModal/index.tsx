import React from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import { useCreateCollection } from "../../../api-hookts/collection/useCreateCollection";
import InputField from "@/components/fields/form/InputField";
import * as Yup from "yup";
import { useEditCollection } from "../../../api-hookts/collection/useEditCollection";
import { DashboardCollection } from "../../../_common/types/collection";
import SelectField from "@/components/fields/form/SelectField";
import ChooseMedia from "./ChooseMedia";
function AddEditCollectionModal({
  isOpen,
  setIsOpen,
  editingCollection,
  setEditingCollection,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingCollection?: DashboardCollection;
  setEditingCollection: React.Dispatch<
    React.SetStateAction<DashboardCollection | undefined>
  >;
}) {
  const { mutate: createCollection } = useCreateCollection({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editCollection } = useEditCollection({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingCollection?.id || -1,
  });
  const isEditing = !!editingCollection?.id;
  return (
    <CenteredModal
      title={isEditing ? "Edit Collection" : "Create Collection"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      onClose={() => {
        setEditingCollection(undefined);
      }}
    >
      <Formik
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          sectionTitle: Yup.string(),
          sectionSubtitle: Yup.string(),
          sectionAction: Yup.string(),
          sectionActionLink: Yup.string(),
          mediaType: Yup.string(),
          media: Yup.array().of(Yup.object().required("Media is required")),
        })}
        initialValues={{
          name: editingCollection?.name || "",
          sectionTitle: editingCollection?.sectionTitle || "",
          sectionSubtitle: editingCollection?.sectionSubtitle || "",
          sectionAction: editingCollection?.sectionAction || "",
          sectionActionLink: editingCollection?.sectionActionLink || "",
          mediaType: editingCollection?.mediaType || "padded",
          media:
            editingCollection?.media?.map((m) => ({
              id: m.mediaId,
              name: m.name,
              url: m.url,
            })) || [],
        }}
        onSubmit={(values) => {
          const refinedValues = {
            ...values,
            mediaIds: values.media.map((m) => m.id),
            media: undefined,
          };
          if (isEditing) {
            editCollection(refinedValues);
          } else {
            createCollection(refinedValues);
          }
        }}
      >
        <Form>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <ChooseMedia />
            </div>
            <InputField name="name" label="Name" colSpan={6} />
            <InputField
              name="sectionTitle"
              label="Section Title"
              placeholder="Section Title"
              colSpan={6}
            />
            <InputField
              name="sectionSubtitle"
              label="Section Subtitle"
              placeholder="Section Subtitle"
              colSpan={6}
            />
            <InputField
              name="sectionAction"
              label="Section Action"
              placeholder="Section Action"
              colSpan={6}
            />
            {/* <InputField
              name="sectionActionLink"
              label="Section Action Link"
              placeholder="Section Action Link"
              colSpan={6}
            /> */}
            <SelectField
              name="mediaType"
              label="Media Type"
              data={[
                { value: "full", label: "Full Width" },
                { value: "padded", label: "Padded" },
              ]}
              colSpan={6}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddEditCollectionModal;
