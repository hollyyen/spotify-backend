import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import "./StatCard.css";

export default function StatCard({ label, value, change, positive }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <span className={"stat-change " + (positive ? "positive" : "negative")}>
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
        <span className="stat-period">vs last month</span>
      </span>
    </div>
  );
}
