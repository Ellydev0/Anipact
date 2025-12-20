export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 4) + "...";
};

export function stripHtml(html: string) {
  if (typeof window === "undefined") {
    // SSR-safe fallback
    return html.replace(/<[^>]*>?/gm, "");
  }

  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}
