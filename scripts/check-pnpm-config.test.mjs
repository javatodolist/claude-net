import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, test } from 'node:test'
import {
  checkProject,
  parsePnpmWorkspace,
  validatePackageJson,
  validatePnpmWorkspace,
} from './check-pnpm-config.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const VALID_WORKSPACE = `
shamefullyHoist: true

overrides:
  d3-array: ^3
  d3-shape: ^3

allowBuilds:
  '@parcel/watcher': true
  esbuild: true
`

describe('parsePnpmWorkspace', () => {
  test('reads allowBuilds, overrides, and shamefullyHoist from the v11 config file shape', () => {
    const config = parsePnpmWorkspace(VALID_WORKSPACE)
    assert.equal(config.shamefullyHoist, true)
    assert.equal(config.allowBuilds.esbuild, true)
    assert.equal(config.allowBuilds['@parcel/watcher'], true)
    assert.equal(config.overrides['d3-array'], '^3')
    assert.equal(config.overrides['d3-shape'], '^3')
  })

  test('treats pnpm auto-inserted placeholders as strings, not booleans', () => {
    const config = parsePnpmWorkspace(`
allowBuilds:
  '@parcel/watcher': set this to true or false
  esbuild: set this to true or false
`)
    assert.equal(config.allowBuilds.esbuild, 'set this to true or false')
    assert.equal(config.allowBuilds['@parcel/watcher'], 'set this to true or false')
  })
})

describe('validatePnpmWorkspace', () => {
  test('accepts the approved deploy config', () => {
    assert.deepEqual(validatePnpmWorkspace(parsePnpmWorkspace(VALID_WORKSPACE)), [])
  })

  test('rejects the ERR_PNPM_IGNORED_BUILDS placeholder values pnpm writes', () => {
    const errors = validatePnpmWorkspace(
      parsePnpmWorkspace(`
shamefullyHoist: true
overrides:
  d3-array: ^3
  d3-shape: ^3
allowBuilds:
  '@parcel/watcher': set this to true or false
  esbuild: set this to true or false
`),
    )
    assert.ok(errors.some((error) => error.includes("allowBuilds['esbuild']") && error.includes('ERR_PNPM_IGNORED_BUILDS')))
    assert.ok(errors.some((error) => error.includes("allowBuilds['@parcel/watcher']")))
  })

  test('rejects missing or denied native build scripts', () => {
    const missing = validatePnpmWorkspace(
      parsePnpmWorkspace(`
shamefullyHoist: true
overrides:
  d3-array: ^3
  d3-shape: ^3
`),
    )
    const denied = validatePnpmWorkspace(
      parsePnpmWorkspace(`
shamefullyHoist: true
overrides:
  d3-array: ^3
  d3-shape: ^3
allowBuilds:
  esbuild: false
  '@parcel/watcher': false
`),
    )
    assert.ok(missing.some((error) => error.includes('esbuild')))
    assert.ok(denied.some((error) => error.includes('esbuild') && error.includes('false')))
  })

  test('requires d3 overrides that used to live in package.json#pnpm', () => {
    const errors = validatePnpmWorkspace(
      parsePnpmWorkspace(`
shamefullyHoist: true
allowBuilds:
  esbuild: true
  '@parcel/watcher': true
`),
    )
    assert.ok(errors.some((error) => error.includes('overrides.d3-array')))
    assert.ok(errors.some((error) => error.includes('overrides.d3-shape')))
  })
})

describe('validatePackageJson', () => {
  test('flags pnpm.overrides left in package.json, which pnpm v11 ignores', () => {
    const errors = validatePackageJson({
      pnpm: { overrides: { 'd3-array': '^3' } },
    })
    assert.ok(errors.some((error) => error.includes('package.json#pnpm.overrides')))
  })

  test('accepts a package.json with no pnpm field', () => {
    assert.deepEqual(validatePackageJson({ name: 'claude-net' }), [])
  })
})

describe('shipped deploy artifacts', () => {
  test('checkProject accepts the repository pnpm-workspace.yaml and package.json', () => {
    assert.deepEqual(checkProject(ROOT), [])
  })

  test('deploy.sh runs the config check, then pnpm install, then the vitepress build', () => {
    const deploy = readFileSync(join(ROOT, 'scripts/deploy.sh'), 'utf8')
    const installIndex = deploy.indexOf('pnpm install')
    const checkIndex = deploy.indexOf('check-pnpm-config.mjs')
    const buildIndex = deploy.indexOf('pnpm run build')
    const assetsIndex = deploy.indexOf('check-static-assets.mjs')
    assert.ok(checkIndex !== -1, 'deploy.sh must invoke check-pnpm-config.mjs')
    assert.ok(assetsIndex !== -1, 'deploy.sh must invoke check-static-assets.mjs')
    assert.ok(installIndex !== -1, 'deploy.sh must run pnpm install')
    assert.ok(buildIndex !== -1, 'deploy.sh must run pnpm run build')
    assert.ok(checkIndex < installIndex, 'config check must run before pnpm install')
    assert.ok(assetsIndex < buildIndex, 'asset check must run before pnpm run build')
    assert.ok(installIndex < buildIndex, 'pnpm install must run before pnpm run build')
    assert.match(deploy, /confirmModulesPurge=false/)
    assert.match(deploy, /tar --no-xattrs --no-mac-metadata/)
  })
})
