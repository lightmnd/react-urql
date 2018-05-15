import React from 'react'
import { Connect, mutation } from 'urql'

const postMutation = `
  mutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
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
`

const CreateLink = ({ children }) => (
  <Connect mutation={{
    post: mutation(postMutation)
  }}>
    {({ post }) => children({ post })}
  </Connect>
)

export default CreateLink
