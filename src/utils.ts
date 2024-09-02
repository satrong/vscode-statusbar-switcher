import * as vscode from 'vscode'
import { defineLogger } from 'reactive-vscode'

export const logger = defineLogger('Statusbar Switcher')

export function getConfig<T = unknown>(key: string) {
  const [section, ...keys] = key.split('.')
  return vscode.workspace.getConfiguration(section).get<T>(keys.join('.'))
}

export function setConfig(path: string, value: any, target: 'global' | 'workspace' = 'global') {
  const [name, ...keys] = path.split('.')
  vscode.workspace.getConfiguration(name).update(keys.join('.'), value, target === 'global')
}

export function objAIncludesObjB(objA: any, objB: any) {
  return Object.entries(objB).every(([key, value]) => {
    return objA[key] === value
  })
}
