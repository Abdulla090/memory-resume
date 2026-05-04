import React, { useEffect, useRef, useState, useContext } from "react";
import { UpdateDataContext, FieldFocusContext } from "./DesignContext";

export function Editable({
  value,
  path,
  as: Component = "span",
  className = "",
  placeholder = "Enter text...",
  onFocus,
}: {
  value: string;
  path: string;
  as?: any;
  className?: string;
  placeholder?: string;
  onFocus?: () => void;
}) {
  const elementRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const updateData = useContext(UpdateDataContext);
  const focusField = useContext(FieldFocusContext);
  const [initialValue] = useState(value);

  // Sync internal DOM state with external value only when not editing
  useEffect(() => {
    if (elementRef.current && !isEditing && elementRef.current.innerText !== value) {
      elementRef.current.innerText = value;
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (elementRef.current && updateData) {
      const text = elementRef.current.innerText.trim();
      if (text !== value) {
        updateData(path, text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Optional: Enter to save for single-line inputs
    if (e.key === "Enter" && Component !== "div" && Component !== "p") {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  return (
    <Component
      ref={elementRef}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-50/10 focus:rounded px-0.5 -mx-0.5 transition-colors cursor-text ${
        !value ? "empty:before:content-[attr(placeholder)] empty:before:text-slate-300" : ""
      } ${className}`}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => {
        setIsEditing(true);
        focusField?.(path);
        onFocus?.();
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      data-editable="true"
      data-path={path}
      dangerouslySetInnerHTML={{ __html: initialValue }}
    />
  );
}
