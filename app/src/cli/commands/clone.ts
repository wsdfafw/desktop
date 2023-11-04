import * as QueryString from 'querystring'
import { URL } from 'url'

import { CommandError } from '../util'
import { openDesktop } from '../open-desktop'
import { ICommandModule, mriArgv } from '../load-commands'

interface ICloneArgs extends mriArgv {
  readonly branch?: string
}

export const command: ICommandModule = {
  command: 'clone <url|slug>',
  description: '克隆仓库',
  args: [
    {
      name: 'url|slug',
      required: true,
      description: '要克隆的 URL 或 GitHub 所有者/仓库别名',
      type: 'string',
    },
  ],
  options: {
    branch: {
      type: 'string',
      aliases: ['b'],
      description: '克隆后要检出的分支',
    },
  },
  handler({ _: [cloneUrl], branch }: ICloneArgs) {
    if (!cloneUrl) {
      throw new CommandError('必须指定克隆 URL')
    }
    try {
      const _ = new URL(cloneUrl)
      _.toString() // 不标记为未使用
    } catch (e) {
      // 无效的 URL，假设是 GitHub 仓库
      cloneUrl = `https://github.com/${cloneUrl}`
    }
    const url = `openRepo/${cloneUrl}?${QueryString.stringify({
      branch,
    })}`
    openDesktop(url)
  },
}
