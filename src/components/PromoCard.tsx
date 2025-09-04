import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type PromoCardProps = {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt?: string;
  actionLabel?: string;
  disabled?: boolean;
  className?: string;
};

export const PromoCard: React.FC<PromoCardProps> = ({
  title,
  description,
  imgSrc,
  imgAlt = "",
  actionLabel = "Learn",
  className = "",
}) => {
  return (
    <Card className={cn("rounded p-3 gap-2", className)}>
      <CardContent className="px-2 flex flex-col items-center ">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="max-h-44 max-w-44 object-contain"
        />

        <div className="w-full">
          <CardHeader className="p-0">
            <CardTitle className="text-sm font-medium m-0">{title}</CardTitle>
            <CardDescription className="mt-1 text-xs text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <Button className="w-full bg-gray-200 text-foreground">
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromoCard;
