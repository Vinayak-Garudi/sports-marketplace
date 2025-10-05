"use client"
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "./Input"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface SelectOption {
  label: string
  value: string
}

interface SearchableSelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
  helperText?: string
}

export const SearchableSelect = ({
  options: initialOptions,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  error,
  helperText,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [options, setOptions] = useState(initialOptions)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const filtered = initialOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setOptions(filtered)
  }, [searchTerm, initialOptions])

  const handleSelect = useCallback(
    (value: string) => {
      onChange?.(value)
      setSearchTerm("")
      setIsOpen(false)
    },
    [onChange]
  )

  return (
    <div className="relative w-full">
      <ShadcnSelect
        value={value}
        onValueChange={handleSelect}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger
          className={cn(
            {
              "border-red-500 focus:ring-red-500": error,
            },
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
          </div>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {options.length === 0 && (
            <div className="p-2 text-sm text-gray-500">No options found</div>
          )}
        </SelectContent>
      </ShadcnSelect>
      {helperText && (
        <p
          className={cn("mt-1 text-sm", {
            "text-red-500": error,
            "text-gray-500": !error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}