import { Button as ShadcnButton } from "@/components/ui/button"
import { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { IconType } from "react-icons"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  icon?: IconType
  iconPosition?: "left" | "right"
  iconClassName?: string
}

export const Button = ({
  children,
  icon: Icon,
  iconPosition = "left",
  iconClassName,
  className,
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton
      className={cn("flex items-center gap-2 cursor-pointer", className)}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon className={cn("h-5 w-5", iconClassName)} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={cn("h-5 w-5", iconClassName)} />
      )}
    </ShadcnButton>
  )
}