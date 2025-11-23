import "./globals.css";
import MuiThemeProvider from "@/providers/mui-theme-provider";
import QueryProvider from "@/providers/query-provider";

export const metadata = {
  title: "School Attendance Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
