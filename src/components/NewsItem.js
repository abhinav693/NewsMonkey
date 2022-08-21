import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl?imageUrl:"https://chorus.stimg.co/23136587/merlin_45091970.jpg?w=525&h=600&format=auto%2Ccompress&cs=tinysrgb&auto=compress&crop=faces&dpr=1"}  className="card-img-top" alt="..." />
            <div className="card-body">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{source}</span>
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small class="text-muted">By {author? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
