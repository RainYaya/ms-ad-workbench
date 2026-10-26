// Map mock/source view URLs to the real SUT routes.
// Mock/source:  /AMB/AMA01.html
// Real SUT:    /mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00
const ROOTS = { AMB: '/mhkcmwa11', AMC00: '/mhkagwa11', ANB00: '/mhkcmwa12' };
const GAMCD = { AMB: 'AMA00', AMC00: 'AMC00', ANB00: 'ANA00' };

export function runtimeUrl(raw, baseUrl, live = false) {
  const s = String(raw ?? '');
  if (!live) return new URL(s, baseUrl).href;
  const m = s.match(/^\/(AMB|AMC00|ANB00)\/([A-Za-z]+\d+)\.html(?:[?#].*)?$/);
  if (m) {
    const [, app, view] = m;
    return new URL(`${ROOTS[app]}/${view}?gamid=${view}&gamcd=${GAMCD[app]}`, baseUrl).href;
  }
  const d = s.match(/^\/(AMB|AMC00|ANB00)\/dummy\.html(?:[?#].*)?$/);
  if (d) return new URL(`${ROOTS[d[1]]}/dummy.html`, baseUrl).href;
  return new URL(s, baseUrl).href;
}
