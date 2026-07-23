import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 border-t border-black/10 py-5 text-sm text-black/70">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p>&copy; 2025 Khusoma Platform. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/about" className="transition hover:text-black">
            About
          </Link>
          <Link href="/terms" className="transition hover:text-black">
            Terms
          </Link>
          <Link href="/privacy" className="transition hover:text-black">
            Privacy
          </Link>
          <Link href="/cookies" className="transition hover:text-black">
            Cookies
          </Link>
          <Link href="/community-guidelines" className="transition hover:text-black">
            Community Guidelines
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
