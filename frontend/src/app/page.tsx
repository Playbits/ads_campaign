import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-10 p-10">
      {/* Add Ads Campaign component */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Ads Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>List of created ads campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
