const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/components/DesignPanel.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Add Hero UI imports at the top
const importRegex = /import \{[\s\S]*?\} from "lucide-react";/;
const heroUiImport = `import { Slider as HeroSlider, Select as HeroSelect, SelectItem, Switch as HeroSwitch, Button as HeroButton, ButtonGroup as HeroButtonGroup, Tooltip as HeroTooltip } from "@heroui/react";`;
content = content.replace(importRegex, match => `${match}\n${heroUiImport}`);

// Replace Slider
const oldSlider = /function Slider\(\{[\s\S]*?\}\) \{[\s\S]*?const pct = \(\(value - min\) \/ \(max - min\)\) \* 100;\n  return \([\s\S]*?    <\/div>\n  \);\n\}/;
const newSlider = `function Slider({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="pt-2">
      <HeroSlider
        label={<Label>{label}</Label>}
        step={step}
        maxValue={max}
        minValue={min}
        value={value}
        onChange={(val) => onChange(val as number)}
        getValue={(v) => \`\${typeof v === "number" && !Number.isInteger(v) ? v.toFixed(2) : v}\${unit}\`}
        className="max-w-md"
        size="sm"
        color="primary"
        classNames={{
          label: "mb-0",
          value: "text-[10px] font-semibold tabular-nums text-blue-600"
        }}
      />
    </div>
  );
}`;
content = content.replace(oldSlider, newSlider);

// Replace Select
const oldSelect = /function Select\(\{[\s\S]*?\}\) \{[\s\S]*?    <\/select>\n  \);\n\}/;
const newSelect = `function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <HeroSelect
      selectedKeys={[value]}
      onChange={(e) => {
        if (e.target.value) onChange(e.target.value);
      }}
      size="sm"
      variant="faded"
      classNames={{
        trigger: "rounded-xl shadow-sm border border-slate-200",
        value: "text-[11px] font-medium text-slate-800"
      }}
      aria-label="Select option"
    >
      {options.map((o) => (
        <SelectItem key={o.value} value={o.value} textValue={o.label}>
          <span className="text-[12px]">{o.label}</span>
        </SelectItem>
      ))}
    </HeroSelect>
  );
}`;
content = content.replace(oldSelect, newSelect);

// Replace Toggle
const oldToggle = /function Toggle\(\{[\s\S]*?\}\) \{[\s\S]*?    <\/div>\n  \);\n\}/;
const newToggle = `function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[11px] font-medium text-slate-700">{label}</span>
      <HeroSwitch 
        isSelected={checked} 
        onValueChange={onChange} 
        size="sm" 
        color="success"
      />
    </div>
  );
}`;
content = content.replace(oldToggle, newToggle);

// Replace IconRow
const oldIconRow = /function IconRow<T extends string>\(\{[\s\S]*?\}\) \{[\s\S]*?    <\/div>\n  \);\n\}/;
const newIconRow = `function IconRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; icon: ReactNode; tip: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <HeroButtonGroup size="sm" variant="flat">
        {options.map((o) => (
          <HeroTooltip key={o.value} content={o.tip} delay={500} size="sm">
            <HeroButton
              isIconOnly
              onPress={() => onChange(o.value)}
              className="min-w-8 w-8 h-8 rounded-lg"
              style={{
                background: value === o.value ? "#2563eb" : "transparent",
                color: value === o.value ? "#ffffff" : "#64748b",
              }}
            >
              {o.icon}
            </HeroButton>
          </HeroTooltip>
        ))}
      </HeroButtonGroup>
    </div>
  );
}`;
content = content.replace(oldIconRow, newIconRow);

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Replaced atoms");
