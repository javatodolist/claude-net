#!/usr/bin/env node
/**
 * pnpm v11 部署前置检查：allowBuilds / overrides 必须写在 pnpm-workspace.yaml。
 * 占位符会让 pnpm install 以 ERR_PNPM_IGNORED_BUILDS 失败。
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const REQUIRED_ALLOW_BUILDS = ['esbuild', '@parcel/watcher']
export const REQUIRED_OVERRIDES = ['d3-array', 'd3-shape']

function parseScalar(raw) {
  const value = raw.trim()
  if (value === '') return undefined
  if (value === 'true') return true
  if (value === 'false') return false
  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function unquoteKey(key) {
  const trimmed = key.trim()
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

export function parsePnpmWorkspace(text) {
  const result = {
    allowBuilds: {},
    overrides: {},
    shamefullyHoist: undefined,
  }
  let section = null

  for (const rawLine of text.split(/\r?\n/)) {
    const withoutComment = rawLine.replace(/(?:^|\s)#.*$/, '')
    if (!withoutComment.trim()) continue

    const indent = rawLine.match(/^[ \t]*/)[0].length
    const trimmed = withoutComment.trim()
    const colon = trimmed.indexOf(':')
    if (colon === -1) continue

    const key = unquoteKey(trimmed.slice(0, colon))
    const value = parseScalar(trimmed.slice(colon + 1))

    if (indent === 0) {
      if (key === 'shamefullyHoist') {
        result.shamefullyHoist = value
        section = null
        continue
      }
      if (key === 'allowBuilds' || key === 'overrides') {
        section = key
        continue
      }
      section = null
      continue
    }

    if (section) {
      result[section][key] = value
    }
  }

  return result
}

export function validatePnpmWorkspace(config) {
  const errors = []

  if (config.shamefullyHoist !== true) {
    errors.push(
      'shamefullyHoist must be true in pnpm-workspace.yaml (pnpm v11 ignores .npmrc hoist settings)',
    )
  }

  const allowBuilds = config.allowBuilds ?? {}
  for (const pkg of REQUIRED_ALLOW_BUILDS) {
    const value = allowBuilds[pkg]
    if (value === true) continue
    if (typeof value === 'string') {
      errors.push(
        `allowBuilds['${pkg}'] is still a placeholder (${JSON.stringify(value)}); set it to true or pnpm install fails with ERR_PNPM_IGNORED_BUILDS`,
      )
      continue
    }
    errors.push(
      `allowBuilds['${pkg}'] must be true so install scripts can download the native binary (got ${JSON.stringify(value)})`,
    )
  }

  const overrides = config.overrides ?? {}
  for (const pkg of REQUIRED_OVERRIDES) {
    if (overrides[pkg] == null || overrides[pkg] === '') {
      errors.push(
        `overrides.${pkg} must live in pnpm-workspace.yaml (package.json#pnpm.overrides is ignored by pnpm v11)`,
      )
    }
  }

  return errors
}

export function validatePackageJson(pkg) {
  const errors = []
  if (pkg?.pnpm?.overrides) {
    errors.push(
      'package.json#pnpm.overrides is ignored by pnpm v11; move overrides to pnpm-workspace.yaml',
    )
  }
  if (pkg?.pnpm?.onlyBuiltDependencies) {
    errors.push(
      'package.json#pnpm.onlyBuiltDependencies is ignored by pnpm v11; use allowBuilds in pnpm-workspace.yaml',
    )
  }
  return errors
}

export function checkProject(rootDir) {
  const workspacePath = join(rootDir, 'pnpm-workspace.yaml')
  const packagePath = join(rootDir, 'package.json')
  const workspaceText = readFileSync(workspacePath, 'utf8')
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))
  return [
    ...validatePnpmWorkspace(parsePnpmWorkspace(workspaceText)),
    ...validatePackageJson(pkg),
  ]
}

const invokedDirectly =
  Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url

if (invokedDirectly) {
  const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
  const errors = checkProject(rootDir)
  if (errors.length > 0) {
    console.error('pnpm v11 配置检查失败（会导致 ERR_PNPM_IGNORED_BUILDS / overrides 被忽略）：')
    for (const error of errors) {
      console.error(` - ${error}`)
    }
    process.exit(1)
  }
}
