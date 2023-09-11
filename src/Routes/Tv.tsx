import styled from "styled-components";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import { ListType, MediaType } from "../Constants";
import { IGetMediaResult, IMovie, getAiringTodayTvShows, getOnTheAirTvShows, getPopularTvShows, getTopRatedTvShows } from "../api";
import { useQuery } from 'react-query';

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

function Tv() {
    const { data:airingTodayInfos, isLoading:loadingAiringToday } = useQuery<IGetMediaResult>(["tv", "airingToday"], getAiringTodayTvShows);
    const { data:popularInfos, isLoading:loadingPopular } = useQuery<IGetMediaResult>(["tv", "popular"], getPopularTvShows);
    const { data:topRatedInfos, isLoading:loadingTopRated } = useQuery<IGetMediaResult>(["tv", "topRated"], getTopRatedTvShows);
    const { data:onTheAirInfos, isLoading:loadingOnTheAir } = useQuery<IGetMediaResult>(["tv", "onTheAir"], getOnTheAirTvShows);
    
    console.log(airingTodayInfos);
    const mediaType = MediaType.tv;

    return (<Wrapper>
    {loadingAiringToday? (
    <Loader>Loading...</Loader>
    ): (
        <>
            <Banner 
                bannerInfo={airingTodayInfos?.results[0] as IMovie}
            />  
            <SliderArea>
                <Slider 
                    mediaType={mediaType}
                    title="Airing Today"
                    listType={ListType.now_playing}
                    data={airingTodayInfos as IGetMediaResult}
                />
                {loadingOnTheAir? null : (
                    <Slider
                        mediaType={mediaType}
                        title="On The Air"
                        listType={ListType.upcoming}
                        data={onTheAirInfos as IGetMediaResult}
                    />)
                }
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
            </SliderArea>  
        </>
    )}
   </Wrapper>);
}

export default Tv;