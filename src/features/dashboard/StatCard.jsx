import React from "react";
import { Card } from "../../components/ui/Card.jsx";

// Pure presentational — receives a label + value, renders them. Reused
// four times in DashboardPage with different data. This is the
// "reusable component" half of Stage 1-2: same JSX, different props.
export function StatCard({ label, value }) {
  return (
    <Card className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </Card>
  );
}
