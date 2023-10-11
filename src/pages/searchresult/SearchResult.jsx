import { useEffect, useState } from "react"
import "./style.scss"
import { useParams } from "react-router-dom";
import {fetchDataFromApi} from '../../utils/api'
import ContentWrapper from "../../components/wrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResult = () => {

const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [pageNum, setPageNum] = useState(1);
const { query } = useParams();

const fetchInitialData = () => {
  setLoading(true);
  fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
    setData(res);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  })
}

const fetchNextPageData = () => {
  fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
    (res) => {
      if(data?.results){
        setData({
          ...data,
          results: [...data?.results,...res.results]
        });
      }
      else
      setData(res);

    setPageNum((prev) => 1+prev);
    }
  )
}

useEffect(() => {
  setPageNum(1);
  fetchInitialData();
},[query])

  return (
    <div className="searchResultsPage">
        {loading && <Spinner initial={true}/>}
        {!loading && (
          <ContentWrapper>
              {data?.results?.length>0 ? (
                <>
                <div className="pageTitle">
                  {`Search ${data?.total_results>1 ? "results" : "result"} of ${query}`}
                </div>
                <InfiniteScroll className="content" dataLength={data?.results?.length} next={fetchNextPageData} loader={<Spinner />} hasMore={pageNum <= data?.total_pages}>
                  {data?.results?.map((item,index) => {
                    if(item.media_type === "person")
                    return;
                  return (
                    <MovieCard key={index} fromSearch={true} data={item}/>
                  )
                  })}
                </InfiniteScroll>
                </>
              ) : (
                <span className="resultNotFound">
                Sorry, Results not found!
                </span>
              )}
          </ContentWrapper>
        )}
    </div>
  )
}

export default SearchResult