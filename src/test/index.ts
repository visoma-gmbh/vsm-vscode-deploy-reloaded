/**
 * This file is part of the vscode-deploy-reloaded distribution.
 * Copyright (c) Marcel Joachim Kloubert.
 *
 * vscode-deploy-reloaded is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * vscode-deploy-reloaded is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

//
// Mocha test runner for the extension host.
//
// Replaces the runner previously provided by the deprecated `vscode` package
// (`vscode/lib/testrunner`). The extension host calls the exported `run()`
// function; see runTest.ts for the @vscode/test-electron launcher.
//

'use strict';

import * as path from 'path';

export function run(): Promise<void> {
    // mocha + glob are loaded via require to stay compatible with the
    // project's existing (older) @types, mirroring how extension.ts loads deps.
    const Mocha = require('mocha');
    const glob = require('glob');

    const mocha = new Mocha({
        ui: 'tdd',          // the TDD UI is used in extension.test.ts (suite, test, etc.)
        useColors: true,    // colored output from test results
    });

    const testsRoot = path.resolve(__dirname, '.');

    return new Promise<void>((resolve, reject) => {
        glob('**/*.test.js', { cwd: testsRoot }, (err: Error | null, files: string[]) => {
            if (err) {
                return reject(err);
            }

            files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

            try {
                mocha.run((failures: number) => {
                    if (failures > 0) {
                        reject(new Error(`${failures} tests failed.`));
                    } else {
                        resolve();
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    });
}
