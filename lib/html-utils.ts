/**
 * Fixes HTML to be compatible with MDX by ensuring all self-closing tags
 * are properly formatted with a trailing slash.
 */
export function fixHtmlForMdx(html: string): string {
  // Fix img tags that don't have a closing slash
  const fixedHtml = html.replace(/<img([^>]*)>/g, '<img$1 />');
  
  // Fix other self-closing tags if needed
  return fixedHtml
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />');
} 