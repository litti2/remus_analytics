'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// A minimal NavLink wrapper that applies an active class when the current pathname matches href
export type NavLinkProps = {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>;

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const cls = cn(className, isActive && activeClassName);
    return <Link ref={ref as any} href={href} className={cls} {...(props as any)} />;
  }
);

NavLink.displayName = 'NavLink';

export { NavLink };
