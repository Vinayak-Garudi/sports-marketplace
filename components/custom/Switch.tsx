import { Switch as ShadcnSwitch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  description?: string
  error?: boolean
  helperText?: string
}

export const Switch = ({
  checked,
  onCheckedChange,
  label,
  description,
  className,
  error,
  helperText,
  ...props
}: SwitchProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <ShadcnSwitch
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={cn(
            {
              "data-[state=checked]:bg-red-500": error,
            },
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div>
            {label && <div className="text-sm font-medium">{label}</div>}
            {description && (
              <div className="text-sm text-gray-500">{description}</div>
            )}
          </div>
        )}
      </div>
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