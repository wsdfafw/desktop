# [GitHub Desktop](https://desktop.github.com)

[GitHub Desktop](https://desktop.github.com/) 是一个基于 [Electron](https://www.electronjs.org/) 的开源 GitHub 应用程序。它使用 [TypeScript](https://www.typescriptlang.org) 编写，并使用 [React](https://reactjs.org)。

<picture>
  <source
    srcset="https://user-images.githubusercontent.com/634063/202742848-63fa1488-6254-49b5-af7c-96a6b50ea8af.png"
    media="(prefers-color-scheme: dark)"
  />
  <img
    width="1072"
    src="https://user-images.githubusercontent.com/634063/202742985-bb3b3b94-8aca-404a-8d8a-fd6a6f030672.png"
    alt="GitHub Desktop 应用程序的屏幕截图，显示正在查看和提交的更改以及两个协作者的署名"
  />
</picture>

## 从哪里获取它？

下载适用于您的操作系统的官方安装程序：

- [macOS](https://central.github.com/deployments/desktop/desktop/latest/darwin)
- [macOS (Apple Silicon)](https://central.github.com/deployments/desktop/desktop/latest/darwin-arm64)
- [Windows](https://central.github.com/deployments/desktop/desktop/latest/win32)
- [Windows 机器范围安装](https://central.github.com/deployments/desktop/desktop/latest/win32?format=msi)

Linux 并没有官方支持；但是，您可以在 [Community Releases](https://github.com/desktop/desktop#community-releases) 部分找到为 Linux 创建的 GitHub Desktop 的安装程序。

### Beta 渠道

想要测试新功能并在其他人之前获得修复？安装 beta 渠道以获得 Desktop 的早期版本：

- [macOS](https://central.github.com/deployments/desktop/desktop/latest/darwin?env=beta)
- [macOS (Apple Silicon)](https://central.github.com/deployments/desktop/desktop/latest/darwin-arm64?env=beta)
- [Windows](https://central.github.com/deployments/desktop/desktop/latest/win32?env=beta)
- [Windows (ARM64)](https://central.github.com/deployments/desktop/desktop/latest/win32-arm64?env=beta)

最新 beta 版本的发布说明在[此处](https://desktop.github.com/release-notes/?env=beta)可用。

### 社区发布

有几个由社区支持的包管理器可以用来安装 GitHub Desktop：
- Windows 用户可以使用 [winget](https://docs.microsoft.com/en-us/windows/package-manager/winget/) 进行安装：`c:\> winget install github-desktop` 或使用 [Chocolatey](https://chocolatey.org/) 进行安装：`c:\> choco install github-desktop`
- macOS 用户可以使用 [Homebrew](https://brew.sh/) 包管理器进行安装：`$ brew install --cask github`

各种 Linux 发行版的安装程序可以在 [`shiftkey/desktop`](https://github.com/shiftkey/desktop) 分支上找到。

## GitHub Desktop 是否适合我？主要关注领域是什么？

[此文档](https://github.com/desktop/desktop/blob/development/docs/process/what-is-desktop.md) 描述了 GitHub Desktop 的重点和产品最适合的人群。

## 我在使用 GitHub Desktop 时遇到问题

注意：[GitHub Desktop 行为准则](https://github.com/desktop/desktop/blob/development/CODE_OF_CONDUCT.md)适用于与 GitHub Desktop 项目相关的所有互动。

首先，请搜索 [open issues](https://github.com/desktop/desktop/issues?q=is%3Aopen) 和 [closed issues](https://github.com/desktop/desktop/issues?q=is%3Aclosed) ，看看您的问题是否已经有人报告（它可能也已经被修复）。

还有一些正在跟踪的 [已知问题](https://github.com/desktop/desktop/blob/development/docs/known-issues.md)，其中一些问题有解决方法。

如果找不到与您的问题相匹配的问题，可以打开一个 [新问题](https://github.com/desktop/desktop/issues/new/choose)，选择适当的模板并提供足够的信息供我们进一步调查。

## 我报告的问题尚未解决。我该怎么办？

如果在几天内没有人回应您的问题，欢迎在问题中友好地提醒一下。如果没有人回应，请不要再次回应。GitHub Desktop 的维护人员受到时间和资源的限制，诊断个别配置可能会很困难和耗时。虽然我们会尽量指导您朝正确的方向前进，但我们不能保证能够深入研究每个人的问题。

## 如何贡献给 GitHub Desktop？

[CONTRIBUTING.md](./.github/CONTRIBUTING.md) 文档将帮助您设置环境并熟悉源代码。[documentation](docs/) 文件夹还包含了与项目相关的更多资源。

如果您正在寻找要处理的任务，请查看 [help wanted](https://github.com/desktop/desktop/issues?q=is%3Aissue+is%3Aopen+label%3A%22help%20wanted%22) 标签。

## 构建 Desktop

要设置用于构建 Desktop 的开发环境，请查看：[`setup.md`](./docs/contributing/setup.md)。

## 更多资源

请访问 [desktop.github.com](https://desktop.github.com) 以获取有关 GitHub Desktop 的更多面向产品的信息。

要获取有关如何设置、认证和配置 GitHub Desktop 的更多信息，请查看我们的 [入门文档](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/overview/getting-started-with-github-desktop)。

## 许可证

**[MIT](LICENSE)**

MIT 许可证不适用于 GitHub 的商标，包括标志设计。GitHub 保留对所有 GitHub 商标的商标和版权权利。GitHub 的商标包括，例如，包含“logo”在文件标题中的样式化 Invertocat 设计，在以下文件夹中：[logos](app/static/logos)。

GitHub® 及

其样式化版本和 Invertocat 商标是 GitHub 的商标或注册商标。在使用 GitHub 的商标时，请务必遵循 GitHub 的[商标指南](https://github.com/logos)。
