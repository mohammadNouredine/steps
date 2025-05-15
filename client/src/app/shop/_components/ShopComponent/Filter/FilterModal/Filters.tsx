import { useGetCollectionOptions } from "@/api/api-hooks/collections/useGetCollectionOptions";
import { LANGUAGES_OPTIONS } from "@/common/constants/languages";
import Divider from "@/components/common/ui/Divider";
import DoubleRangeSlider from "@/components/fields/form/DoubleRangeSlider";
import SelectField from "@/components/fields/form/SelectField";
import { useQueryStrings } from "@/hooks/useQueryStrings";
import { Form, Formik } from "formik";
import React from "react";

function Filters({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: collections, isPending } = useGetCollectionOptions();
  const collection_options = collections?.map((collection) => ({
    value: collection.id,
    label: collection.name,
  }));

  const { appendQueries, prevQueries } = useQueryStrings();
  const defaultValues = {
    minPrice: 0,
    maxPrice: 1000,
    minAge: 0,
    maxAge: 10,
    gender: "UNISEX",
    language: "ALL",
    collectionIds: [],
  };

  return (
    <div className="flex-grow flex flex-col">
      <Formik
        initialValues={{
          minPrice: Number(prevQueries.minPrice) || defaultValues.minPrice,
          maxPrice: Number(prevQueries.maxPrice) || defaultValues.maxPrice,
          minAge: Number(prevQueries.minAge) || defaultValues.minAge,
          maxAge: Number(prevQueries.maxAge) || defaultValues.maxAge,
          gender: prevQueries.gender || defaultValues.gender,
          language: prevQueries.language || "ALL",
          collectionIds:
            prevQueries.collectionIds?.split(",").map((id) => Number(id)) || [],
        }}
        onSubmit={(values) => {
          appendQueries({
            minPrice:
              values.minPrice === defaultValues.minPrice ? "" : values.minPrice,
            maxPrice:
              values.maxPrice === defaultValues.maxPrice ? "" : values.maxPrice,
            minAge: values.minAge === defaultValues.minAge ? "" : values.minAge,
            maxAge: values.maxAge === defaultValues.maxAge ? "" : values.maxAge,
            gender: values.gender === defaultValues.gender ? "" : values.gender,
            language:
              values.language === defaultValues.language ? "" : values.language,
            collectionIds: values.collectionIds.join(","),
          });

          setIsOpen(false);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="flex-grow flex flex-col">
              <div className="space-y-4 flex-grow ">
                {/* <DoubleRangeSlider
                  title="Price"
                  min={0}
                  max={1000}
                  values={[values.minPrice, values.maxPrice]}
                  onChange={(values) => {
                    setFieldValue("minPrice", values[0]);
                    setFieldValue("maxPrice", values[1]);
                  }}
                />
                <Divider /> */}
                <DoubleRangeSlider
                  title="Age"
                  min={0}
                  max={10}
                  values={[values.minAge, values.maxAge]}
                  onChange={(values) => {
                    setFieldValue("minAge", values[0]);
                    setFieldValue("maxAge", values[1]);
                  }}
                />

                <Divider />
                <SelectField
                  name="language"
                  label="Language"
                  data={[...LANGUAGES_OPTIONS, { value: "ALL", label: "All" }]}
                />
                <Divider />

                <SelectField
                  isLoadingData={isPending}
                  name="collectionIds"
                  label="Collection"
                  multiSelect
                  data={collection_options || []}
                />
                <Divider />

                {/* <ButtonGroup
                  name="gender"
                  label="Gender"
                  options={[
                    { label: "All", value: "UNISEX" },
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                  ]}
                /> */}
              </div>
              <button
                type="submit"
                className="bg-primary w-[90vw] lg:w-full left-1/2  text-white rounded-full px-6 py-3 font-medium mt-4  bottom-4 "
              >
                Apply Filters
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Filters;
