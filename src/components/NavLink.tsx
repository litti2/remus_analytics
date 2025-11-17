'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef, forwardRef as _unused } from 'react';
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkCompatProps = {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

import { forwardRef } from 'react';

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const cls = cn(className, isActive && activeClassName);
    return (
      <Link ref={ref as any} href={href} className={cls} {...(props as any)} />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
