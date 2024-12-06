import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignFrom } from "./form";
import { CampaignTable } from "./table";

export default function Home() {
  return (
    <div className="flex gap-10 p-10">
      {/* Add Ads Campaign component */}
      <Card className="w-1/4 md:w-4/4 relative">
        <CardHeader>
          <CardTitle>Create New Ads Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Ads Form</p>
          <CampaignFrom />
        </CardContent>
      </Card>
      <Card className="w-3/4 md:w-4/4">
        <CardHeader>
          <CardTitle>List of created ads campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Ads Campaign List</p>
          {/* <CampaignTable /> */}
        </CardContent>
      </Card>
    </div>
  );
}
