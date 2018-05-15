import React, { Component } from 'react'

import Link from './Link'
import Search from './queries/search'

class SearchList extends Component {
  state = {
    filter: null,
    input: ''
  }

  onChangeFilter = ({ target: { value } }) => {
    this.setState({ input: value })
  }

  executeSearch = () => {
    this.setState(s => ({ filter: s.input }))
  }

  render() {
    const { filter, input } = this.state

    return (
      <div>
        <div>
          Search
          <input
            type="text"
            value={input}
            onChange={this.onChangeFilter}
          />

          <button
            onClick={this.executeSearch}
            disabled={!input}
          >
            OK
          </button>
        </div>

        <Search filter={filter}>
          {({ fetching, links }) => {
            if (fetching) {
              return <div>Loading</div>
            } else if (!!filter && !links.length) {
              return <div>No Results</div>
            }

            return (
              <div>
                {links.map((link, index) => (
                  <Link key={link.id} link={link} index={index} />
                ))}
              </div>
            )
          }}
        </Search>
      </div>
    )
  }
}

export default SearchList
