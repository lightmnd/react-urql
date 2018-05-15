import React, { Component } from 'react'

import Link from './Link'
import Feed from './queries/feed'

class LinkList extends Component {
  goToPage = page => this.props.history.push(`/new/${page}`)

  render() {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    return (
      <Feed page={page} isNewPage={isNewPage}>
        {({ fetching, error, index, links, nextPage, previousPage }) => {
          if (fetching || !links) {
            return <div>Loading</div>
          } else if (error) {
            return <div>Error</div>
          }

          return (
            <div>
              <div>
                {links.map((link, i) => (
                  <Link
                    key={link.id}
                    index={index + i}
                    link={link}
                  />
                ))}
              </div>

              {isNewPage && (nextPage !== null || previousPage !== null) && (
                <div className="flex ml4 mv3 gray">
                  {previousPage !== null && (
                    <div className="pointer mr2" onClick={() => this.goToPage(previousPage)}>
                      Previous
                    </div>
                  )}

                  {nextPage !== null && (
                    <div className="pointer" onClick={() => this.goToPage(nextPage)}>
                      Next
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        }}
      </Feed>
    )
  }
}

export default LinkList
