import { Card, CardContent, CardHeader, CardTitle } from "@/lib/shadcn/card";
import { displayNumber } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  shouldFormat?: boolean;
}
const Datacard = ({ label, value, shouldFormat = false }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">
          {shouldFormat ? displayNumber(value, "$") : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default Datacard;
