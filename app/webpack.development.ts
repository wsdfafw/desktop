import * as common from './webpack.common'
import * as webpack from 'webpack'
import merge from 'webpack-merge'

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
}

const mainConfig = merge({}, common.main, config)
const cliConfig = merge({}, common.cli, config)
const highlighterConfig = merge({}, common.highlighter, config)

const getRendererEntryPoint = () => {
  const entry = common.renderer.entry as webpack.EntryObject
  if (entry == null) {
    throw new Error(
      `无法解析入口点。请检查 webpack.common.ts 并重试`
    )
  }

  return entry.renderer as string
}

const getPortOrDefault = () => {
  const port = process.env.PORT
  if (port != null) {
    const result = parseInt(port)
    if (isNaN(result)) {
      throw new Error(`无法将 '${port}' 解析为有效的数字`)
    }
    return result
  }

  return 3000
}

const port = getPortOrDefault()
const webpackHotModuleReloadUrl = `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`
const publicPath = `http://localhost:${port}/build/`

const rendererConfig = merge({}, common.renderer, config, {
  entry: {
    renderer: [webpackHotModuleReloadUrl, getRendererEntryPoint()],
  },
  output: {
    publicPath,
  },
  module: {
    rules: [
      // 这将导致编译后的 CSS（和源映射）嵌入在编译后的 JavaScript 包中，并在运行时作为 blob:// URI 添加。
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'sass-loader?sourceMap',
        ],
      },
    ],
  },
  infrastructureLogging: {
    level: 'error',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

const crashConfig = merge({}, common.crash, config, {
  module: {
    rules: [
      // 这将导致编译后的 CSS（和源映射）嵌入在编译后的 JavaScript 包中，并在运行时作为 blob:// URI 添加。
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'sass-loader?sourceMap',
        ],
      },
    ],
  },
})

// eslint-disable-next-line no-restricted-syntax
export default [
  mainConfig,
  rendererConfig,
  crashConfig,
  cliConfig,
  highlighterConfig,
]
