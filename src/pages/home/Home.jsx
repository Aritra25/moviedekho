import Herobanner from './heroBanner/Herobanner'
import Popular from './popular/Popular'
import './style.scss'
import TopRated from './topRated/TopRated'
import Trending from './trending/Trending'


const Home = () => {
  return (
    <div className='homePage'>
        <Herobanner />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home