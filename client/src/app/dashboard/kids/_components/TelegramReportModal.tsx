"use client";
import React, { useState } from "react";
import CenteredModal from "@/app/_components/popups/CenteredModal";
import { Formik, Form } from "formik";
import DateField from "@/components/fields/form/DateField";
import CheckboxField from "@/components/fields/form/CheckboxField";
import Button from "@/components/common/ui/Button";
import { PiTelegramLogo } from "react-icons/pi";
import { toast } from "react-hot-toast";
import { useSendAttendanceToTelegram } from "../../api-hookts/telegram/useSendAttendanceToTelegram";

export interface TelegramReportOptions {
  date: Date;
  sendAttendance: boolean;
  sendLoans: boolean;
  sendPayments: boolean;
  sendPurchases: boolean;
}

interface TelegramReportModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TelegramReportModal({ isOpen, setIsOpen }: TelegramReportModalProps) {
  const { mutate: sendReportToTelegram, isPending: isSending } =
    useSendAttendanceToTelegram();

  const initialValues: TelegramReportOptions = {
    date: new Date(),
    sendAttendance: true, // Default checked
    sendLoans: false,
    sendPayments: false,
    sendPurchases: false,
  };

  const handleSubmit = (values: TelegramReportOptions) => {
    // Validate at least one option is selected
    if (
      !values.sendAttendance &&
      !values.sendLoans &&
      !values.sendPayments &&
      !values.sendPurchases
    ) {
      toast.error("Please select at least one report type to send.");
      return;
    }

    sendReportToTelegram(values);
  };

  return (
    <CenteredModal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      title="📱 Send Report to Telegram Bot"
      maxWidth="max-w-md"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <CenteredModal.Body>
              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    📅 Report Date
                  </h4>
                  <DateField
                    name="date"
                    label="Select Date"
                    datePickerProps={{
                      placeholder: "Choose report date",
                    }}
                  />
                </div>

                {/* Report Types */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    📊 Report Types
                  </h4>
                  <div className="space-y-3">
                    <CheckboxField
                      name="sendAttendance"
                      title="👥 Send Attendance"
                      description="Kids present/absent for the selected date"
                    />

                    <CheckboxField
                      name="sendLoans"
                      title="💰 Send Loans"
                      description="Current loan balances for all kids"
                    />

                    <CheckboxField
                      name="sendPayments"
                      title="💳 Send Payments"
                      description="Payments made on the selected date"
                    />

                    <CheckboxField
                      name="sendPurchases"
                      title="🛒 Send Purchases"
                      description="Items purchased on the selected date"
                    />
                  </div>
                </div>

                {/* Preview of selected options */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="text-xs font-medium text-gray-600 mb-2">
                    Selected Reports:
                  </h5>
                  <div className="text-xs text-gray-500">
                    {values.sendAttendance && (
                      <span className="inline-block mr-2">👥 Attendance</span>
                    )}
                    {values.sendLoans && (
                      <span className="inline-block mr-2">💰 Loans</span>
                    )}
                    {values.sendPayments && (
                      <span className="inline-block mr-2">💳 Payments</span>
                    )}
                    {values.sendPurchases && (
                      <span className="inline-block mr-2">🛒 Purchases</span>
                    )}
                    {!values.sendAttendance &&
                      !values.sendLoans &&
                      !values.sendPayments &&
                      !values.sendPurchases && (
                        <span className="text-red-500">
                          No reports selected
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </CenteredModal.Body>

            <CenteredModal.Footer>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  buttonType="button"
                  text="Cancel"
                  className="px-4 bg-gray-500 hover:bg-gray-600"
                  onClick={() => setIsOpen(false)}
                />

                <Button
                  type="button"
                  buttonType="submit"
                  text="Send to Bot"
                  loadingText="Sending..."
                  className="px-4"
                  isLoading={isSending}
                  icon={<PiTelegramLogo />}
                />
              </div>
            </CenteredModal.Footer>
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
}

export default TelegramReportModal;
