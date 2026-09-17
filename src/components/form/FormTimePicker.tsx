"use client";

import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Clock } from "lucide-react";
import clsx from "clsx";

interface FormTimePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

// Convert 12-hour format ("10:00 PM") to 24-hour format ("22:00") for input[type="time"]
export function convert12to24(time12: string): string {
  if (!time12) return "";
  const trimmed = time12.trim();
  if (!trimmed.includes("AM") && !trimmed.includes("PM")) return trimmed;
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "";
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hour < 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, "0")}:${minute}`;
}

// Convert 24-hour format ("22:00") to 12-hour format ("10:00 PM")
export function convert24to12(time24: string): string {
  if (!time24) return "";
  if (time24.includes("AM") || time24.includes("PM")) return time24;
  const parts = time24.split(":");
  if (parts.length < 2) return time24;
  let hour = parseInt(parts[0], 10);
  const minute = parts[1];
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;
  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  return `${formattedHour}:${minute} ${ampm}`;
}

export function FormTimePicker({
  name,
  label,
  placeholder = "Select time",
  description,
  disabled = false,
  className,
}: FormTimePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const error = errors[name]?.message as string | undefined;

  const handleContainerClick = () => {
    if (disabled) return;
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === "function") {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <Field>
      <FieldLabel className="text-gray-400" htmlFor={name}>
        {label}
      </FieldLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const val24 = convert12to24(field.value || "");
          const display12 = field.value ? convert24to12(field.value) : "";

          return (
            <div
              onClick={handleContainerClick}
              className={clsx(
                "h-12 bg-card border border-border rounded-lg px-3 flex items-center justify-between cursor-pointer transition-colors group hover:border-primary",
                disabled && "opacity-50 cursor-not-allowed",
                className
              )}
            >
              <div className="flex items-center gap-2.5 flex-1 overflow-hidden">
                <Clock className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span
                  className={clsx(
                    "text-sm font-medium tracking-wide truncate",
                    display12 ? "text-white" : "text-gray-500"
                  )}
                >
                  {display12 || placeholder}
                </span>
              </div>

              {/* Native time input with showPicker */}
              <input
                ref={inputRef}
                type="time"
                id={name}
                disabled={disabled}
                value={val24}
                onChange={(e) => {
                  const new24 = e.target.value;
                  const new12 = convert24to12(new24);
                  field.onChange(new12);
                }}
                className="w-8 h-8 opacity-70 hover:opacity-100 bg-transparent text-white cursor-pointer focus:outline-none [color-scheme:dark] shrink-0"
              />
            </div>
          );
        }}
      />

      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
