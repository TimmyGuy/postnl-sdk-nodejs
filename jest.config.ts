import type { JestConfigWithTsJest } from 'ts-jest/';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    prettierPath: null,
};

export default config;