import { v4 as uuidv4 } from "uuid";

interface ButtonGroupProps {
  label: string;
  name: string;
  options: {
    label: string;
    value: number | string;
  }[];
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
}

function ButtonGroup({
  label,
  name,
  options,
  multiple = false,
  disabled = false,
  loading = false,
  value,
  onChange,
}: ButtonGroupProps) {
  const handleSelection = (option: string | number) => {
    if (multiple) {
      if (Array.isArray(value) && value.includes(option)) {
        onChange(value.filter((item) => item !== option));
      } else {
        onChange([...(Array.isArray(value) ? value : []), option]);
      }
    } else {
      onChange(option);
    }
  };

  return (
    <div className="cursor-pointer">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium capitalize leading-6"
        >
          {label}
        </label>
      )}
      <div id={name} className="flex flex-wrap gap-x-2 gap-y-2">
        {!loading &&
          options.map((option) => {
            return (
              <button
                key={uuidv4()}
                type="button"
                className={`px-3 py-1 border rounded-full ${
                  multiple
                    ? Array.isArray(value) && value.includes(option.value)
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                    : value?.toString() === option.value.toString()
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleSelection(option.value)}
                disabled={disabled}
              >
                {option.label}
              </button>
            );
          })}
        {loading && (
          <div className="grid grid-cols-4 gap-x-2 gap-y-2 w-full">
            {Array(4)
              .fill(0)
              .map(() => (
                <div
                  key={uuidv4()}
                  className="h-12 !w-full animate-pulse rounded-lg bg-gray-200 col-span-1"
                ></div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ButtonGroup;
