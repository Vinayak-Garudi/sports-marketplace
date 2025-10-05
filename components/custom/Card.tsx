import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  cardTitle?: ReactNode
  description?: ReactNode
  footer?: ReactNode
  noPadding?: boolean
}

export const Card = ({
  children,
  className,
  cardTitle,
  description,
  footer,
  noPadding = false,
  ...props
}: CardProps) => {
  return (
    <ShadcnCard className={cn("w-full", className)} {...props}>
      {(cardTitle || description) && (
        <CardHeader>
          {cardTitle && <CardTitle>{cardTitle}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn({ "p-0": noPadding })}>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  )
}