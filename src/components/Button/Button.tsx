import React, {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  small = false,
  gray = false,
  className = "",
  ...props
}: ButtonProps) => {
  const sizeClasses = small ? "px-2 py1" : "px-4 py-2 font-bold";
  const colorClasses = gray
    ? "text-gray-500 hover:bg-gray-100 focus:bg-gray-100"
    : "bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white";
  return (
    <button
      className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
};
