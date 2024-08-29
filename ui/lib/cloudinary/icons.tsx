const CloudUploadIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill="#545459"
        fill-rule="evenodd"
        d="M8.46 7.284a5.296 5.296 0 0 1 9.734 2.543q.085-.003.17-.003a4.386 4.386 0 1 1 0 8.773H7A5.75 5.75 0 1 1 8.46 7.284m6.626 5.185a.75.75 0 0 1-1.055.117L12.75 11.56V15a.75.75 0 0 1-1.5 0v-3.44l-1.282 1.025a.75.75 0 1 1-.937-1.172l2.498-1.997a.75.75 0 0 1 .465-.167h.008c.18 0 .344.064.473.17l2.494 1.994a.75.75 0 0 1 .117 1.055"
        clip-rule="evenodd"
      />
    </svg>
  );
};

const UploadIcon = () => {
  return (
    <svg
      className="shrink-0 size-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" x2="12" y1="3" y2="15"></line>
    </svg>
  );
};

const PauseIcon = () => {
  return (
    <svg
      className="shrink-0 size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="4" height="16" x="6" y="4"></rect>
      <rect width="4" height="16" x="14" y="4"></rect>
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      className="shrink-0 size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      <line x1="10" x2="10" y1="11" y2="17"></line>
      <line x1="14" x2="14" y1="11" y2="17"></line>
    </svg>
  );
};

export { CloudUploadIcon, UploadIcon, PauseIcon, DeleteIcon };
