export const FlagIcon = ({
  variant = "default",
}: {
  variant?: "default" | "active";
}) => {
  let flagPoleColor = "#fffb00";
  let flagColor = "#08ea6e";

  if (variant === "active") flagColor = "#ff2929";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={flagPoleColor}
        fillRule="evenodd"
        d="M6.5 1.75a.75.75 0 0 0-1.5 0v20a.75.75 0 0 0 1.5 0z"
        clipRule="evenodd"
        opacity="1"
      />
      <path
        fill={flagColor}
        d="m13.558 3.873l-.413-.165a8.7 8.7 0 0 0-4.924-.452L6.5 3.6v10l1.72-.344a8.7 8.7 0 0 1 4.925.452a8.68 8.68 0 0 0 5.327.361l.1-.025a.9.9 0 0 0 .553-1.335l-1.56-2.601c-.342-.57-.513-.854-.553-1.163a1.5 1.5 0 0 1 0-.39c.04-.309.211-.594.553-1.163l1.278-2.13a.73.73 0 0 0-.803-1.084a7.3 7.3 0 0 1-4.482-.305"
      />
    </svg>
  );
};
