import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

const HomeCard = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: any;
  icon: JSX.Element;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>data</CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardFooter>
    </Card>
  );
};

export default HomeCard;
