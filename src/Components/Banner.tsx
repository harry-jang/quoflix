import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div<{$bgPhoto:string}>`
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${props => props.$bgPhoto});
    background-size: cover;

`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 30px;
    width: 50% ;
`;

function Banner({
    bannerInfo,
  }: {
    bannerInfo: IMovie;
  }) {
    return (
        <Wrapper $bgPhoto={makeImagePath(bannerInfo.backdrop_path || "")}>
            <Title>{bannerInfo.title?bannerInfo.title : bannerInfo.name}</Title>
            <Overview>{bannerInfo.overview}</Overview>
        </Wrapper>
    );
  }

  export default Banner