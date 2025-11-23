import "./globals.css";
import MuiThemeProvider from "@/providers/mui-theme-provider";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "School Attendance Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <MuiThemeProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  fontSize: '16px',
                  borderRadius: '10px',
                  padding: '16px 24px',
                  color: '#fff',
                  background: '#333',
                },
                success: { 
                  style: { background: '#4caf50' }, 
                  icon: '🎉' 
                },
                error: { 
                  style: { background: '#f44336' }, 
                  icon: '❌' 
                },
              }}
            />
            {children}
          </MuiThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
