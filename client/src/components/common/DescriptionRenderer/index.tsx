import React from "react";

// Define a TypeScript interface for the text objects
interface TextNode {
  type: string;
  text?: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface ParagraphNode {
  type: string;
  children: TextNode[];
}

export interface DescriptionProps {
  description: ParagraphNode[] | null | undefined;
}

const TextFormatter: React.FC<TextNode> = ({
  text,
  bold,
  underline,
  strikethrough,
}) => {
  let formattedText: React.ReactNode = text;

  if (bold) {
    formattedText = <strong>{formattedText}</strong>;
  }
  if (underline) {
    formattedText = <u>{formattedText}</u>;
  }
  if (strikethrough) {
    formattedText = <s>{formattedText}</s>;
  }

  return <>{formattedText}</>;
};

const DescriptionRenderer: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <>
      {description?.map((paragraph, index) => (
        <p key={index}>
          {paragraph.children.map((textNode, index) => (
            <TextFormatter key={index} {...textNode} />
          ))}
        </p>
      ))}
    </>
  );
};

export default DescriptionRenderer;
