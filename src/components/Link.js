import React, { Component } from 'react'

import Upvote from './queries/upvote'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'

class Link extends Component {
  state = {
    isUpvoting: false
  }

  upvote = async () => {
    const { upvote, link: { id } } = this.props
    this.setState({ isUpvoting: true })
    await upvote({ linkId: id })
    this.setState({ isUpvoting: false })
  }

  render() {
    const { isUpvoting } = this.state
    const isLoggedIn = !!localStorage.getItem(AUTH_TOKEN)
    const votesNum = this.props.link.votes.length

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {isLoggedIn && (
            <div className="ml1 gray f11 pointer" onClick={this.upvote}>
              ▲
            </div>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {isUpvoting ? votesNum + 1 : votesNum} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}

export default props => (
  <Upvote>
    {({ upvote }) => <Link upvote={upvote} {...props} />}
  </Upvote>
)
