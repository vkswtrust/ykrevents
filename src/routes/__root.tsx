import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ykr-logo-clean.png.asset.json";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
       { rel: "icon", href: "/favicon.png", type: "image/png" },
       { rel: "preconnect", href: "https://fonts.googleapis.com" },
       { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
       { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <CustomCursor />
      <a href="https://wa.me/917339552366" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat with YKR Events on WhatsApp" title="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.02 2.67C8.66 2.67 2.67 8.66 2.67 16.02c0 2.32.6 4.59 1.73 6.59L2.67 29.33l6.89-1.81a13.3 13.3 0 0 0 6.46 1.65c7.36 0 13.31-5.98 13.31-13.34 0-7.18-5.98-13.16-13.31-13.16Zm0 24.24c-2.03 0-4.02-.55-5.75-1.58l-.42-.25-4.09 1.07 1.09-3.99-.27-.41a10.96 10.96 0 0 1-1.67-5.73c0-6.12 4.98-11.1 11.11-11.1 6.12 0 11.1 4.98 11.1 11.1 0 6.12-4.98 10.89-11.1 10.89Zm6.09-8.18c-.33-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.64-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.51.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.72s1.17 3.16 1.33 3.38c.16.22 2.31 3.53 5.59 4.95.78.34 1.39.54 1.87.69.79.25 1.51.21 2.08.13.63-.09 1.95-.8 2.22-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z"/></svg>
      </a>
    </QueryClientProvider>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let active = false;
    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!active) {
        currentX = targetX;
        currentY = targetY;
        active = true;
        frame = requestAnimationFrame(animate);
      }
      cursor.classList.add("is-visible");
      cursor.classList.toggle("is-interactive", event.target instanceof Element && !!event.target.closest("a, button, input, textarea, select, [role='button']"));
    };
    const hide = () => cursor.classList.remove("is-visible");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span /></div>;
}

const navItems = [
  { label: "Vision", hash: "vision" }, { label: "Services", hash: "services" },
  { label: "Our Work", hash: "work" }, { label: "Philosophy", hash: "philosophy" },
  { label: "Contact", hash: "contact" },
] as const;

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="site-container header-inner">
    <Link to="/" className="logo-link" aria-label="YKR Events home" onClick={() => setOpen(false)}><img src={logo.url} alt="YKR Events" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <Link key={item.hash} to="/" hash={item.hash}>{item.label}</Link>)}</nav>
    <Button asChild className="header-inquiry brand-button"><Link to="/inquiry" onClick={() => setOpen(false)}>Inquiry <ArrowUpRight size={16} /></Link></Button>
    <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
  </div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.hash} to="/" hash={item.hash} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link to="/inquiry" onClick={() => setOpen(false)}>Inquiry <ArrowUpRight size={16} /></Link></nav>}</header>;
}

function SiteFooter() {
  return <footer className="site-footer"><div className="site-container"><div className="footer-grid">
    <div className="footer-brand"><Link to="/" aria-label="YKR Events home"><img src={logo.url} alt="YKR Events" /></Link><p>Where grandeur meets soul.</p></div>
    <div className="footer-nav"><span>EXPLORE</span>{navItems.map((item) => <Link key={item.hash} to="/" hash={item.hash}>{item.label}</Link>)}<Link to="/inquiry">Inquiry</Link></div>
    <div className="footer-contact"><span>GET IN TOUCH</span><a href="tel:+917339552366">+91 73395 52366</a><a href="mailto:ykrevents08@gmail.com">ykrevents08@gmail.com</a><p>Coimbatore, India</p></div>
  </div><div className="footer-bottom"><span>© YKR Productions and Events. All rights reserved.</span><span>MADE TO MOVE PEOPLE</span></div></div></footer>;
}
