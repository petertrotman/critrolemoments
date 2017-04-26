export function createElement(element, attrs, children) {
  const el = document.createElement(element);

  const { classList, ...otherAttrs } = attrs;
  if (classList) classList.forEach(cls => el.classList.add(cls));

  Object.entries(otherAttrs)
    .forEach(([attr, val]) => el.setAttribute(attr, val));

  const append = (child) => {
    if (typeof child === 'string') {
      el.innerHTML = child;
    } else {
      el.appendChild(child);
    }
  };

  if (children === undefined) return el;
  if (Array.isArray(children)) {
    children.forEach(append);
  } else {
    append(children);
  }

  return el;
}

export function parseTimestamp(ts) {
  const split = ts.split(':').reverse();
  const s = parseInt(split[0], 10);
  const m = parseInt(split[1] || 0, 10);
  const h = parseInt(split[2] || 0, 10);
  if (isNaN(s) || isNaN(m) || isNaN(h)) throw new Error(`Invalid timestamp: ${ts}`);
  return { h, m, s };
}

export function leftPad(target, pad, len) {
  let str = target.toString();
  while (str.length < len) {
    str = `${pad}${str}`;
  }
  return str;
}

export function padTimestamp(ts) {
  const ps = parseTimestamp(ts);
  return `${leftPad(ps.h, '0', 2)}:${leftPad(ps.m, '0', 2)}:${leftPad(ps.s, '0', 2)}`;
}

