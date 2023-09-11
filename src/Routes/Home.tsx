import { useQuery } from "react-query";
import styled from "styled-components";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import { ListType, MediaType } from "../Constants";
import { IGetMediaResult, IMovie, getMovies } from "../api";


const Wrapper = styled.div`
    background:black;
    padding-bottom: 200px;
    overflow: hidden;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items : center;
`;



function Home() {

    const { data:nowPlayingInfos, isLoading } = useQuery<IGetMediaResult>(["movies", "nowPlaying"], getMovies);
    
    const mediaType = MediaType.movie;
 
    return <Wrapper>
            {isLoading? (
            <Loader>Loading...</Loader>
            ): (
                <>
                    <Banner 
                        bannerInfo={nowPlayingInfos?.results[0] as IMovie}
                    />   
                    <Slider 
                        mediaType={mediaType}
                        title="Now Playing"
                        listType={ListType.now_playing}
                        data={nowPlayingInfos as IGetMediaResult}
                    />
                    
                </>
            )}
           </Wrapper>;
}

export default Home;