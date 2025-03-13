import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User, Briefcase } from "lucide-react";
import type { Internship } from "@/lib/types";

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{internship.subject}</CardTitle>
          <Badge variant={internship.canRefer ? "default" : "secondary"}>
            {internship.canRefer ? "Can Refer" : "No Referral"}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{internship.location}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {internship.duration} months • {internship.year}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{internship.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Tutor: {internship.tutor}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
            {internship.missions}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/internships/${internship.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
