'use strict';

/**
 * util.isDate polyfill.
 *
 * Node removed the long-deprecated `util.isDate` from the runtime bundled with
 * VS Code 1.117+. A transitive dependency, ssh2-streams@0.1.20
 * (ssh2-sftp-client -> ssh2 -> ssh2-streams), still does
 * `var isDate = util.isDate;` at module load time in lib/sftp.js and would
 * otherwise throw "isDate is not a function" on first use.
 *
 * Because ssh2-streams captures the reference at load time, this polyfill MUST
 * run before that module is required. Keep the `import './polyfill';` line the
 * very first import in extension.ts so this executes before any dependency that
 * pulls in ssh2-streams.
 */

import * as util from 'util';

const u: any = util;

if (typeof u.isDate !== 'function') {
    u.isDate = (v: unknown): boolean =>
        v instanceof Date ||
        (u.types && typeof u.types.isDate === 'function' && u.types.isDate(v));
}
