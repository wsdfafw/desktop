import * as React from 'react'
import { encodePathAsUrl } from '../../lib/path'

const BlankSlateImage = encodePathAsUrl(
  __dirname,
  'static/multiple-files-selected.svg'
)

interface IMultipleSelectionProps {
  /** Called when the user chooses to open the repository. */
  readonly count: number
}
/** The component to display when there are no local changes. */
export class MultipleSelection extends React.Component<
  IMultipleSelectionProps,
  {}
> {
  public render() {
    return (
      <div className="panel blankslate" id="no-changes">
        <img src={BlankSlateImage} className="blankslate-image" alt="" />
        <div>选中{this.props.count}个文件</div>
      </div>
    )
  }
}
