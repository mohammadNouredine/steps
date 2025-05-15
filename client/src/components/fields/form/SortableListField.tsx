import { useFormikContext } from "formik";
import { List } from "rsuite";
interface ListItem {
  label: string;
  value: string | number;
}

export const SortableList = ({ name }: { name: string }) => {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: ListItem[];
  }>();

  const data = values[name] || [];

  const handleSortEnd = (payload: {
    collection: number | string;
    node: HTMLElement;
    newIndex: number;
    oldIndex: number;
  }) => {
    const { newIndex, oldIndex } = payload;

    // Create a copy of the current data
    const newData = [...data];

    // Move the item from the old index to the new index
    const [movedItem] = newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, movedItem);

    // Update the Formik state with the new data
    setFieldValue(name, newData);
  };
  return (
    <List sortable bordered onSort={handleSortEnd}>
      {data.map(({ label }: ListItem, index: number) => (
        <List.Item key={index} index={index}>
          {label}
        </List.Item>
      ))}
    </List>
  );
};
