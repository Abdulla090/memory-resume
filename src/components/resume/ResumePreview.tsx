import { useEffect, useState } from "react";
import type { ComponentType } from "react";

import type { DesignSettings, ResumeData, TemplateId } from "@/lib/types";

type PreviewProps = {
  data: ResumeData;
  template: TemplateId;
  design?: DesignSettings;
  onFieldFocus?: (path: string) => void;
  /** Force LTR/RTL layout in editor; null = auto from content script */
  layoutRtl?: boolean | null;
};

type PreviewComponent = ComponentType<PreviewProps>;

export function ResumePreview(props: PreviewProps) {
  const [Preview, setPreview] = useState<PreviewComponent | null>(null);

  useEffect(() => {
    let active = true;

    void import("./templates").then((mod) => {
      if (active) setPreview(() => mod.ResumePreview as PreviewComponent);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!Preview) {
    return (
      <div className="flex min-h-[240px] items-center justify-center text-sm text-muted-foreground">
        Loading preview...
      </div>
    );
  }

  return <Preview {...props} />;
}
