/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useGlobal } from "@/src/store/global/store";
import { useEffect, useState } from "react";

const LayoutGlobal = ({ children, letter }: Readonly<{ children: React.ReactNode, letter: any }>) => {
  const theme = useGlobal(state => state.theme);
  const setTheme = useGlobal(state => state.setTheme);
  const [mounted, setMounted] = useState(false); // Track mounting status

  useEffect(() => {
    // Ensure that localStorage is only accessed on the client
    if (typeof window !== 'undefined') {
      setMounted(true);
      if (theme !== '') {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-mode", theme);
        document.documentElement.setAttribute("data-topbar-color", theme);
        document.documentElement.setAttribute("data-menu-color", theme);
        setTheme(localStorage.getItem("theme") || theme);
      }
      document.body.style.removeProperty("overflow");
    }
  }, [theme, setTheme]);

  // Only render the component after the component is mounted to avoid SSR issues
  if (!mounted) {
    return null;
  }

  return (
      <html
          lang="en"
          data-mode={localStorage.getItem("theme") || theme}
          dir="ltr"
          data-layout-width="default"
          data-topbar-color={localStorage.getItem("theme") || theme}
          data-menu-color={localStorage.getItem("theme") || theme}
          data-layout-position="fixed">
          <body
              className={`${letter.className} antialiased`}
              style={{
                  overflowY: "auto",
                  overflowX: "hidden",
              }}>
              {children}
          </body>
      </html>
  );
}

export default LayoutGlobal;
