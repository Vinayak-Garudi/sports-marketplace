import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
  iconClassName?: string;
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, icon: Icon, iconClassName, error, helperText, ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        <div className="relative">
          {Icon && (
            <Icon
              className={cn(
                "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500",
                iconClassName,
              )}
            />
          )}
          <ShadcnInput
            className={cn(
              {
                "pl-9": Icon,
                "border-red-500 focus-visible:ring-red-500": error,
              },
              className,
            )}
            ref={ref}
            {...props}
          />
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
    );
  },
);
Input.displayName = "Input";
