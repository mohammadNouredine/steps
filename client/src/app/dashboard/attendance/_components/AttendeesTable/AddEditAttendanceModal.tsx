import React from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { Kid } from "@prisma/client";
import { AttendanceType } from "../../../api-hookts/attendance/useGetAttendance";
import { Form, Formik } from "formik";
import DateField from "@/components/fields/form/DateField";
import SelectField from "@/components/fields/form/SelectField";
import { useGetAllKids } from "@/app/dashboard/api-hookts/kids/useGetAllKids";
import NumberField from "@/components/fields/form/NumberField";
import InputField from "@/components/fields/form/InputField";
import Button from "@/components/common/ui/Button";
import * as Yup from "yup";
import { useCreateAttendance } from "@/app/dashboard/api-hookts/attendance/useCreateAttendance";
import { useEditAttendance } from "@/app/dashboard/api-hookts/attendance/useEditAttendance";
interface AttendanceModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  kid?: Kid;
  attendanceRecord?: AttendanceType;
  setAttendanceRecord?: React.Dispatch<
    React.SetStateAction<AttendanceType | undefined>
  >;
}
const CreateAttendanceSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  kidId: Yup.number().required("Kid ID is required"),
  extraCharge: Yup.number().optional(),
  note: Yup.string().optional(),
});
type CreateAttendanceType = Yup.InferType<typeof CreateAttendanceSchema>;
export default function AddEditAttendanceModal({
  isOpen,
  setIsOpen,
  kid,
  attendanceRecord,
  setAttendanceRecord,
}: AttendanceModalProps) {
  const { data: kids } = useGetAllKids();
  const kids_options = kids?.data.map((kid) => ({
    label: `${kid.firstName} ${kid.lastName}`,
    value: kid.id,
    ...kid,
  }));

  const { mutate: createAttendance, isPending: isCreating } =
    useCreateAttendance({
      callBackOnSuccess: () => {
        setIsOpen(false);
      },
    });
  const { mutate: editAttendance, isPending: isEditing } = useEditAttendance({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  return (
    <CenteredModal
      onClose={() => {
        setAttendanceRecord?.(undefined);
      }}
      title="Attendance"
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={CreateAttendanceSchema}
        initialValues={{
          date: attendanceRecord?.date || "",
          kidId: attendanceRecord?.kidId || kid?.id || 0,
          extraCharge: attendanceRecord?.extraCharge || 0,
          note: attendanceRecord?.note || "",
        }}
        onSubmit={(values: CreateAttendanceType) => {
          if (attendanceRecord) {
            editAttendance(values);
          } else {
            createAttendance(values);
          }
        }}
      >
        <Form>
          <div className="grid grid-cols-2 gap-x-2">
            <DateField disabled={!!attendanceRecord} name="date" label="Date" />
            <SelectField
              disabled={!!attendanceRecord}
              name="kidId"
              label="Kid"
              data={kids_options || []}
            />
            <NumberField name="extraCharge" label="Extra Charge" />
            <InputField name="note" label="Note" />
          </div>
          <Button
            className="mt-4"
            buttonType="submit"
            type="button"
            text="Submit"
            isLoading={isCreating || isEditing}
            loadingText="Submitting..."
          />
        </Form>
      </Formik>
    </CenteredModal>
  );
}
