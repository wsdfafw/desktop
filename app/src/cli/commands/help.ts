import chalk from 'chalk'

import { commands, ICommandModule, IOption } from '../load-commands'

import { dasherizeOption, printTable } from '../util'

export const command: ICommandModule = {
  command: 'help [command]',
  description: '显示一个命令的帮助页面',
  handler({ _: [command] }) {
    if (command) {
      printCommandHelp(command, commands[command])
    } else {
      printHelp()
    }
  },
}

function printHelp() {
  console.log(chalk.underline('命令:'))
  const table: string[][] = []
  for (const commandName of Object.keys(commands)) {
    const command = commands[commandName]
    table.push([chalk.bold(command.command), command.description])
  }
  printTable(table)
  console.log(
    `\n运行 ${chalk.bold(
      `github help ${chalk.gray('<command>')}`
    )} 获取关于每个命令的详细信息`
  )
}

function printCommandHelp(name: string, command: ICommandModule) {
  if (!command) {
    console.log(`未识别的命令: ${chalk.bold.red.underline(name)}`);
    printHelp()
    return
  }
  console.log(`${chalk.gray('github')} ${command.command}`)
  if (command.aliases) {
    for (const alias of command.aliases) {
      console.log(chalk.gray(`github ${alias}`))
    }
  }
  console.log()
  const [title, body] = command.description.split('\n', 1)
  console.log(chalk.bold(title))
  if (body) {
    console.log(body)
  }
  const { options, args } = command
  if (options) {
    console.log(chalk.underline('\n选项:'))
    printTable(
      Object.keys(options)
        .map(k => [k, options[k]] as [string, IOption])
        .map(([optionName, option]) => [
          [optionName, ...(option.aliases || [])]
            .map(dasherizeOption)
            .map(x => chalk.bold.blue(x))
            .join(chalk.gray(', ')),
          option.description,
          chalk.gray(`[${chalk.underline(option.type)}]`),
        ])
    )
  }
  if (args && args.length) {
    console.log(chalk.underline('\n参数:'))
    printTable(
      args.map(arg => [
        (arg.required ? chalk.bold : chalk).blue(arg.name),
        arg.required ? chalk.gray('(必填)') : '',
        arg.description,
        chalk.gray(`[${chalk.underline(arg.type)}]`),
      ])
    )
  }
}
