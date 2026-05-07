import React, { useContext } from "react";
import { UpdateDataContext } from "./DesignContext";
import { Editable } from "./Editable";
import type { ResumeData } from "@/lib/types";

export function InteractiveSkills({
  data,
  skillBar,
  columns,
  isSidebar,
  textColor,
  barBgClass,
  barFillClass,
  circleBorderClass,
  circleFillClass,
  starFillClass,
  starEmptyClass,
  textDescClass,
  tagFilledClass,
  tagBorderClass,
}: {
  data: ResumeData;
  skillBar: string;
  columns: number;
  isSidebar: boolean;
  textColor: string;
  barBgClass: string;
  barFillClass: string;
  circleBorderClass: string;
  circleFillClass: string;
  starFillClass: string;
  starEmptyClass: string;
  textDescClass: string;
  tagFilledClass: string;
  tagBorderClass: string;
}) {
  const updateData = useContext(UpdateDataContext);

  // Auto-upgrade skills to skillItems if missing
  const skillItems = data.skillItems && data.skillItems.length > 0
    ? data.skillItems
    : data.skills.map((s) => ({ name: s, level: 3 }));

  const setLevel = (index: number, level: number) => {
    if (!updateData) return;
    const newItems = [...skillItems];
    newItems[index] = { ...newItems[index], level };
    updateData("skillItems", newItems);
  };

  const moveUp = (index: number) => {
    if (!updateData || index === 0) return;
    const newItems = [...skillItems];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    updateData("skillItems", newItems);
  };

  const moveDown = (index: number) => {
    if (!updateData || index === skillItems.length - 1) return;
    const newItems = [...skillItems];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    updateData("skillItems", newItems);
  };

  const addSkill = () => {
    if (!updateData) return;
    updateData("skillItems", [...skillItems, { name: "New Skill", level: 3 }]);
  };

  const deleteSkill = (index: number) => {
    if (!updateData) return;
    const newItems = [...skillItems];
    newItems.splice(index, 1);
    updateData("skillItems", newItems);
  };

  if (skillBar === "filled" || skillBar === "none") {
    // Show standard tags
    return (
      <div className={`group relative ${isSidebar ? "space-y-2" : "flex flex-wrap gap-2"}`}>
        {skillItems.map((skill, i) => (
          <div
            key={i}
            className={`group/skill relative px-3 py-2 text-[11px] font-bold ${textColor} rounded-xl ${
              skillBar === "filled" ? tagFilledClass : tagBorderClass
            }`}
          >
            <Editable path={`skillItems.${i}.name`} value={skill.name} as="span" />
            <button onClick={() => deleteSkill(i)} className="absolute -top-2 -right-2 hidden group-hover/skill:flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px]">&times;</button>
          </div>
        ))}
        {updateData && (
          <button onClick={addSkill} className={`hidden group-hover:block text-[10px] px-2 py-1 rounded border ${tagBorderClass} ${textColor} opacity-60 hover:opacity-100`}>+ Add</button>
        )}
      </div>
    );
  }

  return (
    <div className={`group relative ${columns === 2 ? "grid grid-cols-2 gap-x-6 gap-y-3" : "flex flex-col gap-3"}`}>
      {skillItems.map((s, i) => (
        <div key={i} className="group/item relative flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <Editable path={`skillItems.${i}.name`} value={s.name} as="span" className={`text-[11px] font-bold ${textColor}`} />
            
            {updateData && (
              <div className="hidden group-hover/item:flex gap-1 items-center bg-slate-800/80 rounded px-1 text-white absolute -top-5 right-0 z-20 shadow-lg">
                <button onClick={() => moveUp(i)} className="p-0.5 hover:text-blue-300" title="Move Up">&uarr;</button>
                <button onClick={() => moveDown(i)} className="p-0.5 hover:text-blue-300" title="Move Down">&darr;</button>
                <button onClick={() => deleteSkill(i)} className="p-0.5 hover:text-red-400" title="Delete">&times;</button>
              </div>
            )}
          </div>
          
          {skillBar === "lines" && (
            <div className={`h-1.5 w-full overflow-hidden rounded-full ${barBgClass} cursor-pointer`} onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                setLevel(i, Math.max(1, Math.ceil(pct * 5)));
            }}>
              <div
                className={`h-full ${barFillClass} transition-all`}
                style={{ width: `${s.level * 20}%` }}
              />
            </div>
          )}
          
          {skillBar === "dots" && (
            <div className="flex gap-1 rtl:flex-row-reverse cursor-pointer">
              {Array.from({ length: 5 }).map((_, dot) => (
                <span
                  key={dot}
                  onClick={() => setLevel(i, dot + 1)}
                  className={`h-2 w-2 rounded-full transition-colors hover:scale-125 ${dot < s.level ? barFillClass : barBgClass}`}
                />
              ))}
            </div>
          )}
          
          {skillBar === "circles" && (
            <div className="flex gap-1 rtl:flex-row-reverse cursor-pointer">
              {Array.from({ length: 5 }).map((_, dot) => (
                <span
                  key={dot}
                  onClick={() => setLevel(i, dot + 1)}
                  className={`h-2 w-2 rounded-full border transition-colors hover:scale-125 ${dot < s.level ? circleFillClass : `bg-transparent ${circleBorderClass}`}`}
                />
              ))}
            </div>
          )}
          
          {skillBar === "stars" && (
            <div className="flex gap-0.5 rtl:flex-row-reverse cursor-pointer">
              {Array.from({ length: 5 }).map((_, dot) => (
                <svg key={dot} onClick={() => setLevel(i, dot + 1)} className={`w-3.5 h-3.5 transition-colors hover:scale-125 ${dot < s.level ? starFillClass : starEmptyClass} fill-current`} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          )}
          
          {skillBar === "text" && (
            <div className={`flex gap-1 text-[10px] font-bold uppercase tracking-wider ${textDescClass}`}>
              {[1,2,3,4,5].map((lvl) => (
                <span key={lvl} onClick={() => setLevel(i, lvl)} className={`cursor-pointer hover:text-[var(--color-heading)] ${s.level === lvl ? "opacity-100 border-b border-current" : "opacity-40"}`}>
                  {lvl === 1 ? "Novice" : lvl === 2 ? "Beginner" : lvl === 3 ? "Skillful" : lvl === 4 ? "Experienced" : "Expert"}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {updateData && (
        <button onClick={addSkill} className={`hidden group-hover:block mt-2 text-[10px] text-center p-1 rounded border ${tagBorderClass} ${textColor} opacity-50 hover:opacity-100`}>
          + Add Skill
        </button>
      )}
    </div>
  );
}
