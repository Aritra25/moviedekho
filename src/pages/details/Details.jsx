import "./style.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Recommendation from './carousel/Recommendation'
import DetailsBannner from "./detailsBanner/DetailsBannner";
import Similar from "./carousel/Similar";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
const Details = () => {
  // const navigate = useNavigation();
  const {mediaType, id} = useParams();
  console.log(mediaType)

  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits,loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBannner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideoSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details