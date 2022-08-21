import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


 capitalizeFirstChar=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
 }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      page: 1,
      totalResults: 0
    };
    document.title = `NewsMonkey - ${this.capitalizeFirstChar(this.props.category)}`
  }

  async updateNews(){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6af1439802d54e4db486c93b47778c36&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url)
    this.props.setProgress(40)
    let parsedData = await data.json()
    this.props.setProgress(80)
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6af1439802d54e4db486c93b47778c36&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    // })
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6af1439802d54e4db486c93b47778c36&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    // })
    this.setState({page: this.state.page - 1})
    this.updateNews();
  }

  handleNextClick = async () => {
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6af1439802d54e4db486c93b47778c36&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     this.setState({loading: true})
    //     let data = await fetch(url)
    //     let parsedData = await data.json()
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6af1439802d54e4db486c93b47778c36&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  }



  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - {this.capitalizeFirstChar(this.props.category)} Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
          >
          <div className="container">
             <div className="row">
                {this.state.articles.map((element, index)=>{
                    return <div className="col-md-4" key={index}>
                    <NewsItem title={element.title?element.title.slice(0,40):" "} description={element.description?element.description.slice(0,80):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
