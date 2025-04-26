import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="bg-secondary rounded-xl p-4 shadow-lg border border-border">
      <div className="flex items-center">
        <label className="mr-3 text-sm font-medium">Mode:</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="flex-grow bg-card border-border text-foreground">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-ai">Full AI Purchase</SelectItem>
            <SelectItem value="ai-recommendations">AI Recommendations</SelectItem>
            <SelectItem value="manual">Manual Shopping</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
