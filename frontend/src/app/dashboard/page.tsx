import DashboardLayout from "@/components/layout/DashboardLayout";
import { Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography>
        Aqui você verá os principais relatórios e navegação para Students, Rooms e Attendance.
      </Typography>
    </DashboardLayout>
  );
}
