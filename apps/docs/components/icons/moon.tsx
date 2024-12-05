import {IconSvgProps} from "@/types";

export const MoonIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.25 12C21.25 14.4533 20.2754 16.806 18.5407 18.5407C16.806 20.2754 14.4533 21.25 12 21.25V22.75C17.937 22.75 22.75 17.937 22.75 12H21.25ZM12 21.25C9.54675 21.25 7.19397 20.2754 5.45926 18.5407C3.72455 16.806 2.75 14.4533 2.75 12H1.25C1.25 17.937 6.063 22.75 12 22.75V21.25ZM2.75 12C2.75 9.54675 3.72455 7.19397 5.45926 5.45926C7.19397 3.72455 9.54675 2.75 12 2.75V1.25C6.063 1.25 1.25 6.063 1.25 12H2.75ZM15.5 14.25C13.975 14.25 12.5125 13.6442 11.4341 12.5659C10.3558 11.4875 9.75 10.025 9.75 8.5H8.25C8.25 10.4228 9.01384 12.2669 10.3735 13.6265C11.7331 14.9862 13.5772 15.75 15.5 15.75V14.25ZM20.425 11.469C19.9133 12.3176 19.191 13.0197 18.3281 13.5069C17.4652 13.9942 16.491 14.2501 15.5 14.25V15.75C16.7494 15.7504 17.9777 15.4279 19.0657 14.8138C20.1537 14.1997 21.0646 13.3148 21.71 12.245L20.425 11.469ZM9.75 8.5C9.74986 7.50903 10.0058 6.53483 10.4931 5.67193C10.9803 4.80902 11.6824 4.08669 12.531 3.575L11.755 2.291C10.6854 2.93628 9.80058 3.84701 9.18649 4.93486C8.57239 6.02271 8.2498 7.25078 8.25 8.5H9.75ZM12 2.75C11.9497 2.74903 11.9002 2.73811 11.8542 2.71785C11.8082 2.6976 11.7666 2.66842 11.732 2.632C11.6898 2.58965 11.6613 2.53568 11.65 2.477C11.646 2.446 11.648 2.356 11.755 2.291L12.531 3.575C13.034 3.271 13.196 2.714 13.137 2.276C13.075 1.821 12.717 1.25 12 1.25V2.75ZM21.71 12.245C21.644 12.352 21.554 12.354 21.523 12.35C21.4643 12.3387 21.4103 12.3102 21.368 12.268C21.3316 12.2334 21.3024 12.1918 21.2821 12.1458C21.2619 12.0998 21.251 12.0503 21.25 12H22.75C22.75 11.283 22.179 10.925 21.724 10.863C21.286 10.804 20.729 10.966 20.425 11.469L21.71 12.245Z"
      fill="currentColor"
    />
  </svg>
);