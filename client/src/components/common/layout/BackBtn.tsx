import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BackBtn({
  onClick,
  href,
}: {
  onClick?: () => void;
  href?: string;
}) {
  const router = useRouter();

  // Helper function to handle back navigation
  const handleBack = () => {
    // Check if custom onClick is provided
    if (onClick) {
      onClick();
    } else {
      // Check if the history stack has more than one entry
      if (window.history.length > 1) {
        console.log("BACK");
        router.back();
      } else {
        console.log("REMOVE");
        // Handle the scenario where there's no history
        // Here we remove the last segment of the path
        const path = window.location.pathname.split("/");
        if (path.length > 1) {
          path.pop(); // Remove the last segment
          const newPath = path.join("/") || "/";
          router.replace(newPath);
        }
      }
    }
  };

  return (
    <div>
      {href ? (
        <Link
          className="border bg-white  group rounded-full p-2 max-w-10 inline-block"
          href={href}
        >
          <div className="transition-all duration-150 ease-in-out group-hover:-translate-x-0.5">
            <ArrowIcon />
          </div>
        </Link>
      ) : (
        <button
          onClick={handleBack}
          className="border bg-white  group rounded-full p-2 max-w-10"
          title="Back"
        >
          <div className="transition-all duration-150 ease-in-out group-hover:-translate-x-0.5">
            <ArrowIcon />
          </div>
        </button>
      )}
    </div>
  );
}

const ArrowIcon = () => {
  return (
    <svg
      className="size-6"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_42_100)">
        <path
          d="M7.35269 8.64731C7.54733 8.45267 7.5475 8.13716 7.35308 7.94231L5.62781 6.21328C5.5102 6.09541 5.5102 5.90459 5.62781 5.78672L7.35308 4.05769C7.5475 3.86284 7.54733 3.54733 7.35269 3.35269V3.35269C7.15791 3.15791 6.84209 3.15791 6.64731 3.35269L4.2948 5.7052C4.13199 5.86801 4.13199 6.13199 4.2948 6.2948L6.64731 8.64731C6.84209 8.84209 7.15791 8.84209 7.35269 8.64731V8.64731Z"
          className="fill-gray-500"
        />
      </g>
      <defs>
        <clipPath id="clip0_42_100">
          <rect width="12" height="12" />
        </clipPath>
      </defs>
    </svg>
  );
};
