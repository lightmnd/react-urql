import React from 'react'
import { Connect, query } from 'urql'

const searchQuery = `
  query($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
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

const Search = ({ children, filter }) => {
  if (!filter) {
    return children({ fetching: false, links: [] })
  }

  return (
    <Connect query={query(searchQuery, { filter })}>
      {({ fetching, error, data }) => {
        const links = data ? data.feed.links : []
        return children({ fetching, error, links })
      }}
    </Connect>
  )
}

export default Search
