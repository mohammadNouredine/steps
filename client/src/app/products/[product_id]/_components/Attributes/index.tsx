import { CustomerProduct } from "@/types/product";
import React from "react";

function Attributes({ product }: { product: CustomerProduct }) {
  if (!product.attributes || product.attributes.length === 0) return null;
  return (
    <div className="px-4">
      <table
        className="w-full mt-4 border-separate border border-gray-200 rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,.05)] "
        style={{
          borderSpacing: "0 0px",
        }}
      >
        <thead>
          <tr className=" ">
            <th className="text-start px-3 rounded-tl-xl py-2 font-medium  border-b">
              Attribute
            </th>
            <th className="text-start px-3 rounded-tr-xl py-2 font-medium  border-b ">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {product?.attributes.map((attribute, index) => (
            <tr key={index} className="  ">
              <td className="px-3 py-2 text-gray-500 ">{attribute.name}</td>
              <td className="px-3 py-2 text-gray-600">
                {attribute.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attributes;
