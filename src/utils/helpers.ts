// Utility functions for animations and UI
import gsap from 'gsap';

export const animateIn = (element: HTMLElement | null, duration = 0.5) => {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration,
    ease: 'power3.out',
  });
};

export const animateOut = (element: HTMLElement | null, duration = 0.3) => {
  if (!element) return;
  return new Promise((resolve) => {
    gsap.to(element, {
      opacity: 0,
      y: -20,
      duration,
      ease: 'power3.in',
      onComplete: resolve,
    });
  });
};

export const scaleIn = (element: HTMLElement | null, duration = 0.4) => {
  if (!element) return;
  gsap.from(element, {
    scale: 0.9,
    opacity: 0,
    duration,
    ease: 'back.out(1.7)',
  });
};

export const pulse = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.to(element, {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
    duration: 0.6,
    yoyo: true,
    repeat: -1,
  });
};

export const staggerChildren = (elements: HTMLElement[], delay = 0.1) => {
  gsap.from(elements, {
    opacity: 0,
    y: 20,
    stagger: delay,
    duration: 0.5,
    ease: 'power3.out',
  });
};

export const formatDate = (date: Date | any): string => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  if (d.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const calculateTimeSince = (date: Date | any): string => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return then.toLocaleDateString();
};
