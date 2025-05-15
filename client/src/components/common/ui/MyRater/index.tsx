import React, {
  Children,
  useState,
  useEffect,
  useRef,
  ReactNode,
  ReactElement,
} from "react";
import MyCustomStar from "./MyCustomStar";

export { MyCustomStar };

interface MyRaterProps {
  starSize?: number;
  rating: number;
  total?: number;
  isDisabled?: boolean;
  children?: ReactNode;
  onRate?: (
    rating: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onCancelRate?: (rating: number) => void;
}

interface MyRaterState {
  rating: number;
  isRating: boolean;
}

export default function MyRater(props: MyRaterProps) {
  const {
    starSize,
    total = 5,
    isDisabled = false,
    children,
    rating: defaultRating,
    onRate,
    onCancelRate,
  } = props;

  const [state, setState] = useState<MyRaterState>({
    rating: defaultRating,
    isRating: false,
  });

  const { rating, isRating } = state;
  const lastRating = useRef<number>(rating);
  const childElements = Children.toArray(children) as ReactElement[];

  function updateState(newState: Partial<MyRaterState>) {
    setState((prevState) => ({ ...prevState, ...newState }));
  }

  function rate(
    newRating: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    updateState({
      rating: newRating,
      isRating: false,
    });
    lastRating.current = newRating;
    onRate && onRate(newRating, e);
  }

  function cancelRate() {
    updateState({
      rating: lastRating.current,
      isRating: false,
    });
    onCancelRate && onCancelRate(lastRating.current);
  }

  useEffect(() => {
    updateState({ rating: defaultRating });
  }, [defaultRating]);

  const nodes = Array.from({ length: total }, (_, i) => {
    const starProps = {
      isActive: !isRating && rating - i >= 1,
      isActiveHalf: !isRating && rating - i >= 0.5 && rating - i < 1,
    };

    return (
      <div
        key={`star-${i}`}
        onClick={
          !isDisabled
            ? (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                rate(i + 1, e)
            : undefined
        }
      >
        {childElements.length ? (
          React.cloneElement(childElements[i % childElements.length], {
            isActive: starProps.isActive,
            isActiveHalf: starProps.isActiveHalf,
          })
        ) : (
          <MyCustomStar
            starSize={starSize}
            isActive={starProps.isActive}
            isActiveHalf={starProps.isActiveHalf}
            isDisabled={isDisabled}
          />
        )}
      </div>
    );
  });

  return (
    <div
      className="flex gap-x-1"
      onMouseOut={!isDisabled ? cancelRate : undefined}
      {...props}
    >
      {nodes}
    </div>
  );
}
