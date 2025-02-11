"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
var vitest_1 = require("vitest");
var react_1 = require("@testing-library/react");
// Cleanup after each test
(0, vitest_1.afterEach)(function () {
    (0, react_1.cleanup)();
});
