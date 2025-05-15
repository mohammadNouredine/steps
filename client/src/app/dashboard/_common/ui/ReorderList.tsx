import React, { useState, DragEvent } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { useGetAllContent } from "../../api-hookts/content/useGetAllContent";
import { PageType } from "../types/content";
import { useDeleteSectionFromContent } from "../../api-hookts/content/section/useDeleteSectionFromContent";
import { useGetAllCollections } from "../../api-hookts/collection/useGetAllCollections";
import { SelectPicker } from "rsuite";
import { useAddSectionToContent } from "../../api-hookts/content/section/useAddSectionToContent";
import { useChangeSectionsOrder } from "../../api-hookts/content/section/useChangeSectionsOrder";

export const ReorderList = () => {
  return (
    <div className="h-screen w-full  text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  // { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  const { data: content_data } = useGetAllContent();

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {content_data?.map((item) => {
        const sections = item.contentSections.map((section) => {
          return {
            title: section.collection.name,
            id: section.id?.toString(),
            column: item.pageName,
          };
        });
        return (
          <Column
            key={item.id}
            title={item.pageName}
            column={item.pageName}
            columnId={item.id}
            headingColor="text-neutral-500"
            cards={sections}
          />
        );
      })}

      <BurnBarrel />
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: PageType;
  columnId: number;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  columnId,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const { mutate: changeSectionsOrder } = useChangeSectionsOrder();
  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      //--------------------------------HERE WE SHOULD ADD THE CARD TO THE CARDS ARRAY
      console.log(copy);
      changeSectionsOrder({
        sections: copy?.map((el, index) => {
          return {
            sectionId: Number(el.id),
            order: index,
          };
        }),
      });
      // setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards?.filter((c) => c.column === column);

  return (
    <div className="w-96 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards?.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-primary/10" : "bg-primary/0"
        }`}
      >
        {filteredCards?.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard columnId={columnId} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: HandleDragStartFunction;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => {
          if (
            e.type === "dragstart" &&
            (e as unknown as DragEvent).dataTransfer
          ) {
            handleDragStart(e as unknown as DragEvent<Element>, {
              title,
              id,
              column,
            });
          }
        }}
        className="cursor-grab rounded border border-neutral-100 shadow-[0_0_4px_0_rgba(0,0,0,.2)] bg-white  p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-600">{title}</p>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-primary/40 opacity-0"
    />
  );
};

const BurnBarrel = () => {
  const [active, setActive] = useState(false);
  const { mutate: deleteCard } = useDeleteSectionFromContent();
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    // setCards((pv) => pv.filter((c) => c.id !== cardId));
    deleteCard({ additionalEndpoint: `${cardId}` });
    //--------------------------------HERE WE SHOULD DELETE

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

type AddCardProps = {
  columnId: number;
};

const AddCard = ({ columnId }: AddCardProps) => {
  const [adding, setAdding] = useState(false);
  const { data: collections } = useGetAllCollections({ withProducts: false });
  const { mutate: addSectionToContent } = useAddSectionToContent({
    contentId: columnId,
    callBackOnSuccess: () => {
      setAdding(false);
    },
  });
  const collectionsOptions = collections?.map((collection) => ({
    value: collection.id,
    label: collection.name,
  }));

  return (
    <>
      {adding ? (
        <motion.div layout>
          <div className="border border-violet-400 bg-violet-400/20 p-3 rounded-lg">
            <SelectPicker
              data={collectionsOptions || []}
              placeholder="Select collection"
              className="w-full"
              onSelect={(value) => {
                addSectionToContent({
                  collectionId: value,
                  contentType: "collection",
                });
              }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

type CardType = {
  title: string;
  id: string;
  column: PageType;
};

type HandleDragStartFunction = (event: DragEvent, card: CardType) => void;
