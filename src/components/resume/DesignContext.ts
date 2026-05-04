import { createContext } from 'react';
import type { DesignSettings, ResumeData } from "@/lib/types";

export const DesignContext = createContext<DesignSettings | undefined>(undefined);
export type UpdateDataFn = (patchOrPath: Partial<ResumeData> | string, value?: any) => void;
export const UpdateDataContext = createContext<UpdateDataFn | undefined>(undefined);
