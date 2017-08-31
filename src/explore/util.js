export function ellipsis(text, maxLength) {
  if (!text) return text;
  return (text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text);
}
