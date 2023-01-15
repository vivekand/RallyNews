import React, { Component} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'; 
export default class News extends Component {
 
  constructor(){
    super();
    this.state={
      articles:[],
      loading:false,
      page:1
        
    };
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0e9f1ff67d1947b5b5f40401ce2f92d1&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data= await fetch(url)  // gives pormis
    let parseData=await data.json();
    this.setState({articles:parseData.articles,totalResults:parseData.totalResults,loading:false})

  }
  // componentDidMount run after render 

  handlePreviousClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0e9f1ff67d1947b5b5f40401ce2f92d1&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data= await fetch(url)  // gives pormis
    let parseData=await data.json();
    
    this.setState({
      page:this.state.page-1,
      articles:parseData.articles,
      loading:false
    })
   
    
  }
  handleNextClick=async()=>{
   
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else
    {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0e9f1ff67d1947b5b5f40401ce2f92d1&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true}) 
      let data= await fetch(url)  // gives pormiss
    
    let parseData=await data.json();
    
    this.setState({
      page:this.state.page+1,
      articles:parseData.articles,
      loading:false
      
    })
    }
    
   
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">RallyNews - Top headlines</h1>
        {this.state.loading&&<Spinner/>}
       <div className="row">
       {!this.state.loading&&this.state.articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,87):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div> 
       })}
       </div>
       <div className="continer d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
       <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
       </div>

      </div>
    )
  }
}
// you have to do slice part..
