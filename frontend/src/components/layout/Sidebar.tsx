"use client";

import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 240;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Students", path: "/students" },
    { text: "Rooms", path: "/rooms" },
    { text: "Attendance", path: "/attendance" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={pathname === item.path}
            onClick={() => router.push(item.path)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
