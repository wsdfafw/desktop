import chalk from 'chalk'
import * as Path from 'path'

import { ICommandModule, mriArgv } from '../load-commands'
import { openDesktop } from '../open-desktop'
import { parseRemote } from '../../lib/remote-parsing'

export const command: ICommandModule = {
  command: 'open <path>',
  aliases: ['<path>'],
  description: '在 GitHub Desktop 中打开一个 git 仓库',
  args: [
    {
      name: 'path',
      description: '要打开的仓库的路径',
      type: 'string',
      required: false,
    },
  ],
  handler({ _: [pathArg] }: mriArgv) {
    if (!pathArg) {
      // 直接打开 Desktop
      openDesktop()
      return
    }
    // 检查 pathArg 是否是一个远程 URL
    if (parseRemote(pathArg) != null) {
      console.log(
        `\n你不能在 GitHub Desktop 中打开一个远程 URL\n` +
          `请使用 \`${chalk.bold(`git clone ` + pathArg)}\`` +
          ` 来进行克隆操作`
      )
    } else {
      const repositoryPath = Path.resolve(process.cwd(), pathArg)
      const url = `openLocalRepo/${encodeURIComponent(repositoryPath)}`
      openDesktop(url)
    }
  },
}
