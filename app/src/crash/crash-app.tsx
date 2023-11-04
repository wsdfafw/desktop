import * as React from 'react'
import { ErrorType } from './shared'
import { TitleBar } from '../ui/window/title-bar'
import { encodePathAsUrl } from '../lib/path'
import { WindowState } from '../lib/window-state'
import { Octicon } from '../ui/octicons'
import * as OcticonSymbol from '../ui/octicons/octicons.generated'
import { Button } from '../ui/lib/button'
import { LinkButton } from '../ui/lib/link-button'
import { getVersion } from '../ui/lib/app-proxy'
import { getOS } from '../lib/get-os'
import * as ipcRenderer from '../lib/ipc-renderer'
import { getCurrentWindowState } from '../ui/main-process-proxy'

// 这是一个奇怪的部分，我们将其保留为占位符
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICrashAppProps {}

interface ICrashAppState {
  /**
   * 表示此错误是否在启动主渲染进程之前引发，
   * 请参考ErrorType类型的文档以获取更多详细信息。
   */
  readonly type?: ErrorType

  /**
   * 引发崩溃进程的错误。
   */
  readonly error?: Error

  /**
   * 窗口的当前状态，例如最大化、最小化、全屏等。
   */
  readonly windowState: WindowState | null
}

// 请注意，我们在这里重用了欢迎插图，对它进行任何更改
// 都必须反映在欢迎流程中。
const BottomImageUri = encodePathAsUrl(
  __dirname,
  'static/welcome-illustration-left-bottom.svg'
)

const issuesUri = 'https://github.com/desktop/desktop/issues'

/**
 * 通过尝试从路径中删除用户可识别信息来格式化错误
 * 并附加系统元数据，如运行版本和当前操作系统。
 */
function prepareErrorMessage(error: Error) {
  let message

  if (error.stack) {
    message = error.stack
      .split('\n')
      .map(line => {
        // 堆栈跟踪行有两种形式：
        //
        // `at Function.module.exports.Emitter.simpleDispatch (SOME_USER_SPECIFIC_PATH/app/node_modules/event-kit/lib/emitter.js:25:14)`
        // `at file:///SOME_USER_SPECIFIC_PATH/app/renderer.js:6:4250`
        //
        // 我们要尽量剥离用户特定的路径部分。
        const match = line.match(/(\s*)(.*)(\(|file:\/\/\/).*(app.*)/)

        return !match || match.length < 5
          ? line
          : match[1] + match[2] + match[3] + match[4]
      })
      .join('\n')
  } else {
    message = `${error.name}: ${error.message}`
  }

  return `${message}\n\nVersion: ${getVersion()}\nOS: ${getOS()}\n`
}

/**
 * 崩溃进程的根组件。
 *
 * 崩溃进程负责在主进程或任何渲染进程因未捕获的异常而崩溃或主渲染器无法加载时向用户呈现错误。
 *
 * 在处理崩溃进程时要小心。如果崩溃进程本身崩溃了，那么我们就失败了。
 */
export class CrashApp extends React.Component<ICrashAppProps, ICrashAppState> {
  public constructor(props: ICrashAppProps) {
    super(props)

    this.state = {
      windowState: null,
    }

    this.initializeWindowState()
  }

  public componentDidMount() {
    ipcRenderer.on('window-state-changed', this.onWindowStateChanged)

    ipcRenderer.on('error', (_, crashDetails) => this.setState(crashDetails))

    ipcRenderer.send('crash-ready')
  }

  public componentWillUnmount() {
    ipcRenderer.removeListener(
      'window-state-changed',
      this.onWindowStateChanged
    )
  }

  private initializeWindowState = async () => {
    const windowState = await getCurrentWindowState()
    if (windowState === undefined) {
      return
    }

    this.setState({ windowState })
  }

  private onWindowStateChanged = (
    _: Electron.IpcRendererEvent,
    windowState: WindowState
  ) => {
    this.setState({ windowState })
  }

  private onQuitButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    ipcRenderer.send('crash-quit')
  }

  private renderTitle() {
    const message =
      this.state.type === 'launch'
        ? 'GitHub Desktop 启动失败'
        : 'GitHub Desktop 发生错误'

    return (
      <header>
        <Octicon symbol={OcticonSymbol.stop} className="error-icon" />
        <h1>{message}</h1>
      </header>
    )
  }

  private renderDescription() {
    if (this.state.type === 'launch') {
      return (
        <p>
          GitHub Desktop 遇到了阻止其启动的严重错误。这已报告给团队，但如果您反复遇到此问题，请向GitHub Desktop的
          <LinkButton uri={issuesUri}>问题跟踪器</LinkButton>
          报告此问题。
        </p>
      )
    } else {
      return (
        <p>
          GitHub Desktop 遇到了不可恢复的错误，需要重新启动。这已报告给团队，但如果您反复遇到此问题，请向GitHub Desktop的
          <LinkButton uri={issuesUri}>问题跟踪器</LinkButton>
          报告此问题。
        </p>
      )
    }
  }

  private renderErrorDetails() {
    const error = this.state.error

    if (!error) {
      return
    }

    return <pre className="error">{prepareErrorMessage(error)}</pre>
  }

  private renderFooter() {
    return <div className="footer">{this.renderQuitButton()}</div>
  }

  private renderQuitButton() {
    let quitText
    // 在开发模式下，我们不支持重新启动，因为我们无法
    // 控制开发服务器的生存周期。
    if (__DEV__) {
      quitText = __DARWIN__ ? '退出' : '退出'
    } else {
      quitText = __DARWIN__ ? '退出并重新启动' : '退出并重新启动'
    }

    return (
      <Button type="submit" onClick={this.onQuitButtonClicked}>
        {quitText}
      </Button>
    )
  }

  private renderBackgroundGraphics() {
    return (
      <img className="background-graphic-bottom" alt="" src={BottomImageUri} />
    )
  }

  public render() {
    return (
      <div id="crash-app">
        <TitleBar
          showAppIcon={false}
          titleBarStyle="light"
          windowState={this.state.windowState}
        />
        <main>
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderErrorDetails()}
          {this.renderFooter()}
          {this.renderBackgroundGraphics()}
        </main>
      </div>
    )
  }
}
