import assert from 'node:assert/strict';
import { runtimeUrl } from './url-map.mjs';

const base = 'http://127.0.0.1:82/mhkcmwa11/dummy.html';
const live = (s) => runtimeUrl(s, base, true);
const mock = (s) => runtimeUrl(s, 'http://127.0.0.1:10090/', false);

assert.equal(live('/AMB/AMA01.html'), 'http://127.0.0.1:82/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00');
assert.equal(live('/AMB/AMA04.html'), 'http://127.0.0.1:82/mhkcmwa11/AMA04?gamid=AMA04&gamcd=AMA00');
assert.equal(live('/AMC00/AMC22.html'), 'http://127.0.0.1:82/mhkagwa11/AMC22?gamid=AMC22&gamcd=AMC00');
assert.equal(live('/ANB00/ANA05.html'), 'http://127.0.0.1:82/mhkcmwa12/ANA05?gamid=ANA05&gamcd=ANA00');
assert.equal(live('/AMB/dummy.html'), 'http://127.0.0.1:82/mhkcmwa11/dummy.html');
assert.equal(mock('/AMB/AMA01.html'), 'http://127.0.0.1:10090/AMB/AMA01.html');
console.log('url-map: PASS');
