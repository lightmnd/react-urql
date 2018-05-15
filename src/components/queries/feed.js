import React from 'react'
import { Connect, query } from 'urql'
import { LINKS_PER_PAGE } from '../../constants'

const feedQuery = `
  query($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      count
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

const getLinksToRender = (data, isNewPage) => {
  if (isNewPage) {
    return data.feed.links
  }

  const rankedLinks = data.feed.links.slice()
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
  return rankedLinks
}

const Feed = ({ children, page, isNewPage }) => {
  const first = LINKS_PER_PAGE
  const skip = (page - 1) * LINKS_PER_PAGE
  const orderBy = isNewPage ? 'createdAt_DESC' : null

  return (
    <Connect query={query(feedQuery, { first, skip, orderBy })}>
      {({ fetching, error, data }) => {
        const linksToRender = data ? getLinksToRender(data, isNewPage) : []
        const index = page ? skip : 0

        const nextPage = !data || !isNewPage || data.feed.count <= skip + LINKS_PER_PAGE
          ? null
          : page + 1

        const previousPage = data && isNewPage && page > 1
          ? page - 1
          : null

        return children({
          fetching,
          error,
          index,
          links: linksToRender,
          nextPage,
          previousPage
        })
      }}
    </Connect>
  )
}

export default Feed
