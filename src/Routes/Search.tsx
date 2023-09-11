import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Slider from "../Components/Slider";
import { ListType, MediaType } from "../Constants";
import { IGetMediaResult, searchMovieData, searchTvShowData } from "../api";

const Wrapper = styled.div`
    padding: 60px;
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
  top : 400px;
`; 

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;


function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
  
    const { data:movieInfos, isLoading:loadingMovie } = useQuery<IGetMediaResult>(["movies", `search-${keyword}`], () => searchMovieData(keyword as string));
    const { data:tvInfos, isLoading:loadingTv } = useQuery<IGetMediaResult>(["tv", `search-${keyword}`], () => searchTvShowData(keyword as string));
    

    return (
        <>
            <Wrapper>
                <Title>"{keyword}" 검색 결과 :</Title>
                <SliderArea>   
                {loadingMovie? <Loader>Loading...</Loader> : (
                    <Slider
                        mediaType={MediaType.movie}
                        title="Movies"
                        listType={ListType.search}
                        data={movieInfos as IGetMediaResult}
                    />)
                }
                {loadingTv? <Loader>Loading...</Loader> : (
                    <Slider
                        mediaType={MediaType.tv}
                        title="Tv Shows"
                        listType={ListType.search}
                        data={tvInfos as IGetMediaResult}
                    />)
                }
                </SliderArea>
            </Wrapper>
        </>
      );
}

export default Search;