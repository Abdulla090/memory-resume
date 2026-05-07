import { createContext } from "react";
import type { DesignSettings, ResumeData } from "@/lib/types";

export const DesignContext = createContext<DesignSettings | undefined>(undefined);
export type UpdateDataFn = (patchOrPath: Partial<ResumeData> | string, value?: unknown) => void;
export const UpdateDataContext = createContext<UpdateDataFn | undefined>(undefined);
export type FieldFocusFn = (path: string) => void;
export const FieldFocusContext = createContext<FieldFocusFn | undefined>(undefined);
