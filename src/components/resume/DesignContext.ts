import { createContext } from "react";
import type { DesignSettings, ResumeData } from "@/lib/types";

export const DesignContext = createContext<DesignSettings | undefined>(undefined);
export type UpdateDataFn = (patchOrPath: Partial<ResumeData> | string, value?: unknown) => void;
export const UpdateDataContext = createContext<UpdateDataFn | undefined>(undefined);
export type FieldFocusFn = (path: string) => void;
export const FieldFocusContext = createContext<FieldFocusFn | undefined>(undefined);
/** When true, Editable components should disable contentEditable (Design tab active). */
export const DesignModeContext = createContext<boolean>(false);

/**
 * When set (true/false), overrides layout direction for the resume preview.
 * null = auto-detect from script in resume content.
 */
export const ResumeLayoutContext = createContext<boolean | null>(null);
