import React, { Component } from 'react'

import CreateLink from './queries/create'

class CreateLinkPage extends Component {
  state = {
    description: '',
    url: '',
    isLoading: false,
    error: null
  }

  onChangeDescription = ({ target: { value } }) => {
    this.setState({ description: value })
  }

  onChangeUrl = ({ target: { value } }) => {
    this.setState({ url: value })
  }

  createLink = async () => {
    const { description, url } = this.state
    const { post } = this.props

    this.setState({ isLoading: true })

    try {
      await post({
        description,
        url,
      })

      this.props.history.push(`/new/1`)
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  render() {
    const { isLoading, error, url, description } = this.state

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={this.onChangeDescription}
            type="text"
            placeholder="A description for the link"
            disabled={isLoading}
          />
          <input
            className="mb2"
            value={url}
            onChange={this.onChangeUrl}
            type="text"
            placeholder="The URL for the link"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={this.createLink}
          disabled={isLoading || !url || !description}
        >
          {!isLoading ? 'Submit' : 'Submitting...'}
        </button>

        {error && <div>{error.message || error}</div>}
      </div>
    )
  }
}

export default props => (
  <CreateLink>
    {({ post }) => <CreateLinkPage post={post} {...props} />}
  </CreateLink>
)
