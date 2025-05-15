import CenteredModal from "@/app/_components/popups/CenteredModal";
import {
  DashboardOrder,
  paymentMethods,
} from "@/app/dashboard/_common/types/order";
import Divider from "@/components/common/ui/Divider";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa6";
import { useMarkOrdersWasPrinted } from "@/app/dashboard/api-hookts/order/useMarkOrdersWasPrinted";

function ViewInvoiceModal({
  isOpen,
  setIsOpen,
  viewwingInvoices,
  setViewwingInvoice,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  viewwingInvoices: DashboardOrder[] | undefined;
  setViewwingInvoice: React.Dispatch<
    React.SetStateAction<DashboardOrder | undefined>
  >;
}) {
  const { mutate: markAsPrinted } = useMarkOrdersWasPrinted({});
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const formatDate = (date: Date | null) => {
    return date
      ? new Date(date).toLocaleDateString() +
          " " +
          new Date(date).toLocaleTimeString()
      : "N/A";
  };

  return (
    <CenteredModal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      onClose={() => {
        setTimeout(() => {
          setViewwingInvoice(undefined);
        }, 300);
      }}
    >
      <CenteredModal.Body>
        <button
          className="absolute top-4 right-4 p-2 rounded-lg border-primary border text-primary hover:bg-primary hover:text-white transition-all"
          onClick={() => {
            if (viewwingInvoices && viewwingInvoices?.length > 0) {
              markAsPrinted({
                ids: viewwingInvoices?.map((invoice) => invoice.id),
              });
            }
            reactToPrintFn();
          }}
        >
          <FaPrint />
        </button>

        <div ref={contentRef}>
          {viewwingInvoices &&
            viewwingInvoices.length > 0 &&
            viewwingInvoices.map((viewwingInvoice, index) => {
              const itemsDiscount = viewwingInvoice?.orderItems.reduce(
                (acc, item) => acc + item.discount * item.quantity,
                0
              );
              return (
                <div
                  className={`invoice-page ${
                    index === 0 ? "first-invoice" : ""
                  }`}
                  key={index}
                >
                  <div className="space-y-6 p-4">
                    <h3 className="text-lg font-semibold">
                      INVOICE NUMBER #{viewwingInvoice.id}
                    </h3>
                    <Divider height={"h-0.5"} bgColor="bg-gray-200" />
                    {/* Customer & Order Information */}
                    <div className="">
                      <h3 className="text-lg font-semibold mb-3">
                        General Info
                      </h3>
                      <div className="flex  justify-between">
                        <div className="gap-4">
                          <h4 className="text-sm font-normal text-gray-400 mb-2">
                            Customer
                          </h4>
                          <p className="font-medium">
                            {viewwingInvoice.customer_name}
                          </p>
                          <p className="font-medium">
                            {viewwingInvoice.customer_phone}
                          </p>
                          <p className="font-medium">
                            {viewwingInvoice.customer_address}
                          </p>
                        </div>
                        <div className="">
                          <h4 className="text-sm font-normal text-gray-400 mb-2">
                            Order
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Order Status
                              </span>
                              <span className="font-medium">
                                {viewwingInvoice.order_status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Payment Method
                              </span>
                              <span className="font-medium">
                                {
                                  paymentMethods.find(
                                    (method) =>
                                      method.value ===
                                      viewwingInvoice.payment_method
                                  )?.label
                                }
                              </span>
                            </div>
                            {viewwingInvoice.is_delivery && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    Pickup Time
                                  </span>
                                  <span className="font-medium">
                                    {formatDate(
                                      viewwingInvoice.delivery_pickup_time
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    Deploy Time
                                  </span>
                                  <span className="font-medium">
                                    {formatDate(
                                      viewwingInvoice.delivery_deploy_time
                                    )}
                                  </span>
                                </div>
                              </>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-400">Created At</span>
                              <span className="font-medium">
                                {formatDate(viewwingInvoice.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Divider height={"h-0.5"} bgColor="bg-gray-200" />
                    {/* Order Items */}
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-3">
                        Order Items
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-6 py-3 text-left font-medium text-gray-400">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left font-medium text-gray-400">
                                Product Variant
                              </th>
                              <th className="px-6 py-3 text-left font-medium text-gray-400">
                                Price
                              </th>
                              <th className="px-6 py-3 text-left font-medium text-gray-400">
                                Quantity
                              </th>
                              <th className="px-6 py-3 text-left font-medium text-gray-400">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {viewwingInvoice.orderItems.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4">
                                    {item.product.name}
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.productVariant
                                      ? item.productVariant.options
                                          .map((opt) => opt.name)
                                          .join("-")
                                      : "N/A"}
                                  </td>{" "}
                                  {/* Placeholder for product variant */}
                                  <td className="px-6 py-4">
                                    {item.discount > 0 && (
                                      <span className=" line-through text-gray-300">
                                        {" "}
                                        ${item.price.toFixed(2)}
                                      </span>
                                    )}
                                    <span>
                                      {" "}
                                      ${(item.price - item.discount).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">{item.quantity}</td>
                                  <td className="px-6 py-4">
                                    {/* total */}$
                                    {(
                                      (item.price - item.discount) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <Divider height={"h-0.5"} bgColor="bg-gray-200" />
                    {/* Totals */}
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">
                            ${viewwingInvoice.total_before_discount.toFixed(2)}
                          </span>
                        </div>
                        {viewwingInvoice.has_discount && (
                          <div className="flex justify-between text-green-600">
                            <span>Order Discount</span>
                            <span>
                              -${viewwingInvoice.discount_amount.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {itemsDiscount && (
                          <div className="flex justify-between text-green-600">
                            <span>Items Discount</span>
                            <span>-${itemsDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span>Total</span>
                          <span>${viewwingInvoice.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {viewwingInvoice.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-1">
                          Notes
                        </h4>
                        <p className="text-gray-700">{viewwingInvoice.notes}</p>
                      </div>
                    )}
                  </div>
                  {viewwingInvoices?.length > 1 &&
                    index !== viewwingInvoices.length - 1 && (
                      <div className="screen-only-divider w-full bg-primary/40 h-8 "></div>
                    )}
                </div>
              );
            })}
        </div>
      </CenteredModal.Body>
    </CenteredModal>
  );
}

export default ViewInvoiceModal;
