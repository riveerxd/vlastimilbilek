"use client";
import { useEffect, useRef } from 'react';

interface HtmlContentProps {
  content: string;
  className?: string;
}

export default function HtmlContent({ content, className = "" }: HtmlContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div 
      ref={containerRef} 
      className={`blog-content ${className}`}
    />
  );
} 