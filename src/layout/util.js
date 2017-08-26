export function mobileView(props) {
  return `@media (max-width: ${props.theme.mobileBreakpoint}px)`;
}

export function desktopView(props) {
  return `@media (min-width: ${props.theme.mobileBreakpoint + 1}px)`;
}

