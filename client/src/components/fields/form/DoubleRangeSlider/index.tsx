import { useState, useRef, useEffect } from "react";

interface DoubleRangeSliderProps {
  min: number;
  max: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
  title?: string;
  factor?: string;
}

export const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  min,
  max,
  values,
  onChange,
  title,
  factor,
}) => {
  const rangeRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  // General function to calculate value based on clientX
  const calculateValue = (clientX: number) => {
    const rect = rangeRef.current!.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    const newValue = Math.round(min + (max - min) * percent);
    return Math.min(Math.max(newValue, min), max);
  };

  // Event handling for both mouse and touch
  const handleDrag = (clientX: number) => {
    if (isMouseDown[0] || isMouseDown[1]) {
      const index = isMouseDown[0] ? 0 : 1;
      const newValue = calculateValue(clientX);
      let newValues: [number, number] =
        index === 0 ? [newValue, values[1]] : [values[0], newValue];

      if (newValues[0] > newValues[1]) {
        newValues = [newValues[1], newValues[0]]; // Swap values
        const activeIndex = index === 0 ? 1 : 0;
        setIsMouseDown([activeIndex === 0, activeIndex === 1]);
      }

      onChange(newValues);
    }
  };

  const handleStart = (index: number) => {
    setIsMouseDown((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates as [boolean, boolean];
    });
  };

  const handleEnd = () => {
    setIsMouseDown([false, false]);
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleEnd);
  };

  const handleMove = (event: MouseEvent | TouchEvent) => {
    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    handleDrag(clientX);
  };

  useEffect(() => {
    if (isMouseDown[0] || isMouseDown[1]) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isMouseDown, values, onChange]); // Include all dependencies

  const percentages = values.map(
    (value) => ((value - min) / (max - min)) * 100
  );

  return (
    <div className="space-y-2">
      {title && <p className="font-medium">{title}</p>}
      <p>
        {values.join(" - ")}
        {factor ? ` ${factor} ` : ""}
      </p>

      <div
        className="relative h-6 w-full cursor-pointer"
        ref={rangeRef}
        onMouseDown={(e) => e.preventDefault()} // Prevent text selection
      >
        <div className="relative h-2 w-full rounded-full bg-gray-200 cursor-pointer translate-y-2">
          <div
            className="absolute h-full bg-primary rounded-full cursor-pointer"
            style={{
              left: `${percentages[0]}%`,
              width: `${percentages[1] - percentages[0]}%`,
            }}
          />
          {percentages.map((percent, index) => (
            <div key={index}>
              <span
                className="absolute bottom-1/2 size-12 z-10 cursor-pointer rounded-full"
                style={{
                  left: `${percent}%`,
                  transform: `translateY(50%) translateX(-50%) ${
                    isMouseDown[index] ? "scale(1.1)" : "scale(1)"
                  }`,
                  transition:
                    "transform 300ms ease-in-out, box-shadow 300ms ease-in-out",
                }}
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleStart(index);
                }}
                onTouchStart={(event) => {
                  event.preventDefault();
                  handleStart(index);
                }}
              />

              <span
                className="absolute bottom-1/2 size-6 cursor-pointer rounded-full border border-primary bg-white shadow-[0_0_4px_0_rgba(0,0,0,.05)]"
                style={{
                  left: `${percent}%`,
                  transform: `translateY(50%) translateX(-50%) ${
                    isMouseDown[index] ? "scale(1.1)" : "scale(1)"
                  }`,
                  transition:
                    "transform 300ms ease-in-out, box-shadow 300ms ease-in-out",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
