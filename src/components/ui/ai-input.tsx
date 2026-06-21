"use client";
// Source: 21st.dev — kokonutd/ai-input. Adapted to the Agenflow brand:
// brand tokens instead of dark:* pairs, accent submit button, voice mic removed,
// disabled/loading state added.
import { CornerRightUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInputProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  disabled?: boolean;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your message...",
  minHeight = 56,
  maxHeight = 200,
  disabled = false,
  onSubmit,
  className,
}: AIInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim() || disabled) return;
    onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative mx-auto w-full">
        <Textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-[var(--radius-lg)] border border-border bg-surface-2 pl-5 pr-16",
            "text-[15.5px] text-fg placeholder:text-fg-faint",
            "resize-none overflow-y-auto leading-[1.4]",
            "ring-accent/40 transition-[height] duration-100 ease-out",
            "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-0",
            "disabled:opacity-60",
            `min-h-[${minHeight}px]`,
            `max-h-[${maxHeight}px]`,
            "[&::-webkit-resizer]:hidden",
          )}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <button
          onClick={handleSubmit}
          type="button"
          disabled={disabled || !inputValue.trim()}
          aria-label="Comprobar"
          className={cn(
            "absolute right-2.5 top-1/2 -translate-y-1/2",
            "rounded-[var(--radius)] bg-accent p-2 text-accent-fg",
            "transition-all duration-200 hover:-translate-y-1/2 hover:opacity-90",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <CornerRightUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
