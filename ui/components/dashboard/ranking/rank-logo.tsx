import React from "react";
import RankS from "./rank-s";
import RankA from "./rank-a";
import RankB from "./rank-b";
import RankC from "./rank-c";

interface Props {
  rank: "S" | "A" | "B" | "C";
}
export default function RankLogo({ rank }: Props) {
  switch (rank) {
    case "S":
      return <RankS />;
    case "A":
      return <RankA />;
    case "B":
      return <RankB />;
    case "C":
      return <RankC />;
  }
}
