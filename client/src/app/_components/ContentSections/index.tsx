import React from "react";
import SingleContentSection from "./SingleContentSection";
import { useGetContentByPageName } from "@/api/api-hooks/content/useGetContentByPageName";
import LoadingContentSection from "@/components/loaders/LoadingContentSection";

function ContentSections() {
  const { data: content, isPending } = useGetContentByPageName({
    pageName: "home",
  });
  const contentSections = content?.contentSections;
  console.log("CONTENT SECTIONS", contentSections);
  return (
    <div className="space-y-8 my-10">
      {contentSections?.map((section, index) => {
        return <SingleContentSection section={section} key={index} />;
      })}
      {isPending &&
        [1, 2].map((_, index) => {
          return <LoadingContentSection key={index} />;
        })}
    </div>
  );
}

export default ContentSections;
