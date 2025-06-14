import React from "react";
import classNames from "classnames";

export function Button({ children, onClick, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-2xl shadow-md hover:bg-blue-700 transition duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
