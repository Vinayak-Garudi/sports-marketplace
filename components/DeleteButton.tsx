"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DeleteButtonProps {
  equipmentId: string;
}

export default function DeleteButton({ equipmentId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Add delete functionality here
    console.log("Delete equipment:", equipmentId);
    setOpen(false);
  };

  return (
    <>
      <div className="absolute bottom-4 right-2 z-20">
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    className="shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-4"
                  side="top"
                  align="end"
                  sideOffset={8}
                >
                  <div className="p-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Are you sure?
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleConfirmDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
