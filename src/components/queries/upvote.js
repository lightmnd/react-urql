import React from 'react'
import { Connect, mutation } from 'urql'

const voteMutation = `
  mutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
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

const Upvote = ({ children }) => (
  <Connect mutation={{ upvote: mutation(voteMutation) }}>
    {({ upvote }) => children({ upvote })}
  </Connect>
)

export default Upvote
