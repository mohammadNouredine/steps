import SelectField from "@/components/fields/form/SelectField";
import { useQueryStrings } from "@/hooks/useQueryStrings";
import { sortByOptions } from "@/types/product";
import { Form, Formik } from "formik";
import React from "react";

function Sorting() {
  const { appendQueries } = useQueryStrings();
  return (
    <div className=" mt-2">
      <Formik
        initialValues={{
          sortBy: "latest",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <div className="flex justify-end">
            <div className="w-32">
              <SelectField
                triggerOnChange={(value) => {
                  appendQueries({ sortBy: value });
                }}
                name="sortBy"
                data={sortByOptions}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Sorting;
