import { defineExtension, useCommand, watchEffect, useStatusBarItem } from 'reactive-vscode'
import type { StatusBarItem } from 'vscode'
import { randomUUID } from 'node:crypto'
import { config } from './configs'
import { name as extName, type ScopedConfigKeyTypeMap } from './generated/meta'
import { logger, getConfig, objAIncludesObjB, setConfig } from './utils'

export = defineExtension(() => {
  const dataSet = new Set<StatusBarItem>()

  watchEffect(() => {
    dataSet.forEach(item => item.dispose())
    dataSet.clear()

    logger.info(extName, '检测到配置文件更新')
    config.config.forEach((data, index) => initStatusBar(data, index + 10))
  })

  function initStatusBar(data: ScopedConfigKeyTypeMap['config'][number], priority: number) {
    const configs = data.items
    if (data.items.length > 0) {
      const keys = data.items.flatMap(item => Object.keys(item.config))
      const currentConfig = getCurrentConfig(keys)
      let currentIndex = configs.findIndex(el => objAIncludesObjB(currentConfig, el.config))
      const matched = configs[currentIndex]
      const label = matched?.label || '?'
      const text = `${data.title}${label}`
      const tooltip = matched ? JSON.stringify(matched.config, null, 2) : ''

      const command = `${extName}.${randomUUID()}`
      const statusBar = useStatusBarItem({ text, tooltip, priority, command })

      useCommand(command, () => {
        currentIndex = currentIndex > -1
          ? currentIndex + 1 > configs.length - 1
            ? 0
            : currentIndex + 1
          : 0
        const currentConfig = data.items[currentIndex]
        Object.entries(currentConfig.config).forEach(([key, value]) => {
          setConfig(key, value, data.target)
        })
        statusBar.text = `${data.title}${currentConfig.label}`
        statusBar.tooltip = JSON.stringify(currentConfig.config, null, 2)
        logger.info(extName, `切换到 ${data.title} ${label}`)
      })

      statusBar.show()
      dataSet.add(statusBar)
    }
  }

  function getCurrentConfig(paths: string[]) {
    return paths.reduce((acc, path) => {
      acc[path] = getConfig<any>(path)
      return acc
    }, {} as Record<string, any>)
  }
})
