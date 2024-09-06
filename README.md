# vscode-statusbar-switcher

Switch any configuration in vscode status bar

## Example

![example](res/example.gif)

Here is an example of how to use this extension.

```json
{
    "statusbar-switcher.config": [
    {
      "title": "主题",
      "target": "global",
      "items": [
        {
          "label": "暗",
          "config": {
            "workbench.colorTheme": "Bearded Theme HC Minuit",
            "editor.fontFamily": "IntelOne Mono",
            "workbench.sideBar.location": "right",
          }
        },
        {
          "label": "亮",
          "config": {
            "workbench.colorTheme": "Bearded Theme Milkshake Mint",
            "editor.fontFamily": "JetBrains Mono",
            "workbench.sideBar.location": "left",
          }
        }
      ]
    }
  }
}
```

## Commands
<!-- commands -->

**No data**

<!-- commands -->


## Configs
<!-- configs -->

| Key                         | Description | Type    | Default |
| --------------------------- | ----------- | ------- | ------- |
| `statusbar-switcher.config` | 配置切换列表      | `array` | `[]`    |

<!-- configs -->