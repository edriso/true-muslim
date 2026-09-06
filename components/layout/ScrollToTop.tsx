'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client-side navigation keeps the window's scroll offset, so following a link
 * from the foot of a long page could leave the reader at the foot of the next
 * one, or part way down it.
 *
 * The router already moves focus to the new page's `<main>`, which is right for
 * a screen reader — but focusing an element scrolls it into view, so the page
 * settles with `<main>` at the top of the viewport and the site header pushed
 * off it. That focus call lands in a microtask after this effect, so correcting
 * the offset once is not enough: the scroll is repeated on the next animation
 * frame, by which time the router has finished.
 *
 * Both are `instant`, so the smooth rule that in-page anchors rely on does not
 * turn this into an animation. A link carrying a fragment is left alone: that
 * navigation asks for a particular element, not for the top. Without JavaScript
 * a navigation is a full page load, which starts at the top anyway.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    const toTop = () =>
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    toTop();
    const frame = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
