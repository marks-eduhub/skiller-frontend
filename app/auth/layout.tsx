"use client"
export default function Layout({ children }: { children: React.ReactNode }) {
  // since different auth screens have different layouts
  // we will instead use nested layouts
  return (
      <div>{children}</div>
  );
}