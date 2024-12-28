import * as React from 'react'
import { LinkButton } from '../lib/link-button'
import { RichText } from '../lib/rich-text'
import { Banner } from './banner'
import { Emoji } from '../../lib/emoji'

interface IOpenThankYouCardProps {
  readonly emoji: Map<string, Emoji>
  readonly onDismissed: () => void
  readonly onOpenCard: () => void
  readonly onThrowCardAway: () => void
}

/**
 * A component which tells the user that there is a thank you card for them.
 */
export class OpenThankYouCard extends React.Component<
  IOpenThankYouCardProps,
  {}
> {
  public render() {
    return (
      <Banner id="open-thank-you-card" onDismissed={this.props.onDismissed}>
        桌面团队要感谢您的贡献.{' '}
        <LinkButton onClick={this.props.onOpenCard}>打开你的卡</LinkButton>{' '}
        <RichText
          className="thank-you-banner-emoji"
          text={':tada:'}
          emoji={this.props.emoji}
          renderUrlsAsLinks={true}
        />
        or <LinkButton onClick={this.onThrowCardAway}>扔掉它</LinkButton>{' '}
        <RichText
          className="thank-you-banner-emoji"
          text={':sob:'}
          emoji={this.props.emoji}
          renderUrlsAsLinks={true}
        />
      </Banner>
    )
  }

  private onThrowCardAway = () => {
    this.props.onDismissed()
    this.props.onThrowCardAway()
  }
}
