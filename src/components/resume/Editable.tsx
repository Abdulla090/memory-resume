import React, { useEffect, useRef, useState, useContext } from "react";
import { UpdateDataContext, FieldFocusContext, DesignModeContext } from "./DesignContext";
import { sanitizeResumeText } from "@/lib/sanitize";

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
  as?: React.ElementType;
  className?: string;
  placeholder?: string;
  onFocus?: () => void;
}) {
  const elementRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const updateData = useContext(UpdateDataContext);
  const focusField = useContext(FieldFocusContext);
  const isDesignMode = useContext(DesignModeContext);
  const safeValue = sanitizeResumeText(value);

  useEffect(() => {
    if (elementRef.current && !isEditing && elementRef.current.innerText !== safeValue) {
      elementRef.current.innerText = safeValue;
    }
  }, [safeValue, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (elementRef.current && updateData) {
      const text = sanitizeResumeText(elementRef.current.innerText.trim());
      if (text !== safeValue) {
        updateData(path, text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && Component !== "div" && Component !== "p") {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const sharedProps = {
    ref: elementRef,
    className: isDesignMode
      ? `cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400/40 hover:outline-offset-2 rounded px-0.5 -mx-0.5 transition-all ${className}`
      : `focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-50/10 focus:rounded px-0.5 -mx-0.5 transition-colors cursor-text ${
          !safeValue ? "empty:before:content-[attr(placeholder)] empty:before:text-slate-300" : ""
        } ${className}`,
    "data-editable": "true" as const,
    "data-path": path,
  };

  if (isDesignMode) {
    return <Component {...sharedProps} />;
  }

  return (
    <Component
      {...sharedProps}
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
    />
  );
}
