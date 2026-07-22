import React, { useEffect, useRef, useState, useContext } from "react";
import { UpdateDataContext, FieldFocusContext, DesignModeContext } from "./DesignContext";
import { sanitizeResumeText } from "@/lib/sanitize";
import { labelForPath } from "./editor-helpers";

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

  // Design mode gets a stronger, always-visible selection affordance
  // but still allows direct text editing (like MyPerfectResume).
  const modeClass = isDesignMode
    ? `cursor-text hover:outline hover:outline-[1.5px] hover:outline-blue-500/70 hover:outline-offset-[2px] focus:outline focus:outline-2 focus:outline-blue-600 focus:outline-offset-[2px] focus:bg-blue-50/40 rounded-[3px] transition-[outline,background] duration-100 ${className}`
    : `focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-50/10 focus:rounded px-0.5 -mx-0.5 transition-colors cursor-text ${
        !safeValue ? "empty:before:content-[attr(placeholder)] empty:before:text-slate-300" : ""
      } ${className}`;

  return (
    <Component
      ref={elementRef}
      className={modeClass}
      data-editable="true"
      data-path={path}
      data-field-path={path}
      data-field-label={labelForPath(path)}
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

