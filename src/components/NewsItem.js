import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl?imageUrl:"https://chorus.stimg.co/23136587/merlin_45091970.jpg?w=525&h=600&format=auto%2Ccompress&cs=tinysrgb&auto=compress&crop=faces&dpr=1"}  className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
