import { useQuery } from "react-query";
import styled from "styled-components";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import { ListType, MediaType } from "../Constants";
import { IGetMediaResult, IMovie, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../api";


const Wrapper = styled.div`
    background:black;
    padding-bottom: 200px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items : center;
`;

const SliderArea = styled.div`
  position: relative;
 
`; 


function Home() {
    const { data:nowPlayingInfos, isLoading:loadingNowPlaying } = useQuery<IGetMediaResult>(["movies", "nowPlaying"], getNowPlayingMovies);
    const { data:popularInfos, isLoading:loadingPopular } = useQuery<IGetMediaResult>(["movies", "popular"], getPopularMovies);
    const { data:topRatedInfos, isLoading:loadingTopRated } = useQuery<IGetMediaResult>(["movies", "topRated"], getTopRatedMovies);
    const { data:upcomingInfos, isLoading:loadingUpcoming } = useQuery<IGetMediaResult>(["movies", "upcoming"], getUpcomingMovies);
    
    const mediaType = MediaType.movie;
 
    return <Wrapper>
            {loadingNowPlaying? (
            <Loader>Loading...</Loader>
            ): (
                <>
                    <Banner 
                        bannerInfo={nowPlayingInfos?.results[0] as IMovie}
                    />  
                    <SliderArea>
                        <Slider 
                            mediaType={mediaType}
                            title="Now Playing"
                            listType={ListType.now_playing}
                            data={nowPlayingInfos as IGetMediaResult}
                        />
                        {loadingPopular? null : (
                            <Slider
                                mediaType={mediaType}
                                title="Popular"
                                listType={ListType.popular}
                                data={popularInfos as IGetMediaResult}
                            />)
                        }
                        {loadingTopRated? null : (
                            <Slider
                                mediaType={mediaType}
                                title="Top Rated"
                                listType={ListType.top_rated}
                                data={topRatedInfos as IGetMediaResult}
                            />)
                        }
                        {loadingUpcoming? null : (
                            <Slider
                                mediaType={mediaType}
                                title="Upcoming"
                                listType={ListType.upcoming}
                                data={upcomingInfos as IGetMediaResult}
                            />)
                        }
                    </SliderArea>  
                </>
            )}
           </Wrapper>;
}

export default Home;