import { Line } from "./line";

interface Props {
  sNum?: number;
  aNum?: number;
  bNum?: number;
  cNum?: number;
  other?: number;
}
export default function SmallChart({
  sNum = 0,
  aNum = 0,
  bNum = 0,
  cNum = 0,
  other = 0,
}: Props) {
  const total = sNum + aNum + bNum + cNum + other;
  const sPercent = Math.round((sNum / total) * 100);
  const aPercent = Math.round((aNum / total) * 100);
  const bPercent = Math.round((bNum / total) * 100);
  const cPercent = Math.round((cNum / total) * 100);

  return (
    <div className="min-w-[200px] w-full h-fit bg-white shadow flex flex-row gap-1">
      {sNum > 0 && <Line color="green" percent={sPercent} />}
      {aNum > 0 && <Line color="cyan" percent={aPercent} />}
      {bNum > 0 && <Line color="blue" percent={bPercent} />}
      {cNum > 0 && <Line color="yellow" percent={cPercent} />}
      {other > 0 && <Line color="gray" />}
    </div>
  );
}
