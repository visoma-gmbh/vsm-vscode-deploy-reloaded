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
// Test launcher: downloads a VS Code instance and runs the extension tests in
// it. Replaces the launcher previously provided by `node ./node_modules/vscode/bin/test`.
//

'use strict';

import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // The folder containing the extension manifest package.json
        // (compiled file lives in out/test/, so go up two levels).
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to the test runner module (out/test/index.js), which
        // exports run().
        const extensionTestsPath = path.resolve(__dirname, './index');

        await runTests({ extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
