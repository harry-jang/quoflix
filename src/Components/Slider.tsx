import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IGetMediaResult, IMovie } from "../api";
import { useState } from "react";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import { ListType, MediaType } from "../Constants";
import Modal from "./Modal";

const Wrapper = styled.div`
    position: relative;
    top : -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap : 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%
`;

const Title = styled.div`
  font-size: 24px;
  padding-left: 20px;
  font-weight: 700;
  padding-bottom: 10px;
`;

const Box = styled(motion.div)<{$bgPhoto: string}>`
    background-color: white;
    background-image: url(${(props) => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    font-size: 66px;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props => props.theme.black.lighter };
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size : 18px;
    }
`

const rowVariants = {
    hidden: {
        x: window.outerWidth+5, // Row의 gap 만큼 보정
    },
    visible: {
        x:0,
    },
    exit: {
        x: -window.outerWidth-5, // Row의 gap 만큼 보정
    },
}

const boxVariants = {
    normal : {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.1,
            type:"tween"
        }
    },
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.1,
            type:"tween"
        }
    }
}

const offset = 6;

interface ISlider {
  data: IGetMediaResult;
  title: string;
  listType: ListType;
  mediaType: MediaType;
}

function Slider ({
                    data,
                    title,
                    listType,
                    mediaType,
                }:ISlider) {
    const navigate = useNavigate();
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const [index, setIndex] = useState(0);

    const increaseIndex = () => {
        if(data) {
            if(leaving) return;

            setLeaving(true);
            const totalMovies = data.results.length -1; // 1번 영화는 배너로 사용중이기 때문에 1감소
            const maxIndex = Math.floor(totalMovies / offset) -1; // 페이지가 0에서 시작하기 때문에 1 감소
            setIndex((prev) => (prev === maxIndex? 0 : prev +1));
        }
    };

    const mediaMatch = useMatch(`/${mediaType}/${listType}/:movieId`);

    const onBoxClicked = (mediaType:MediaType, listType:ListType, movieId:number) => {

        navigate(`/${mediaType}/${listType}/${movieId}`);
    }

    const clickedMovie = mediaMatch?.params.movieId && data?.results.find(movie => String(movie.id) === mediaMatch.params.movieId)

    return (
    <Wrapper>
        <Title>{title}</Title>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}  >
            <Row 
                variants={rowVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
                transition={{type:"tween", duration: 1}}
                key={index}>
                {data?.results
                    .slice(1)
                    .slice(offset*index, offset * index + offset)
                    .map((movie) => (
                    <Box 
                        layoutId={listType + "_" + movie.id}
                        variants={boxVariants}
                        key={listType + "_" + movie.id}
                        initial="normal"
                        whileHover="hover"
                        onClick={() => onBoxClicked(mediaType, listType, movie.id)}
                        transition={{type:"tween"}}               
                        $bgPhoto={makeImagePath(movie.poster_path, "w500" )}>
                            <Info variants={infoVariants}>
                                <h4>{movie.title}</h4>
                            </Info>
                        </Box>
                ))}
            </Row>
        </AnimatePresence>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            {mediaMatch ? (
                <Modal
                    dataId={Number(mediaMatch?.params.movieId)}
                    listType={listType}
                    mediaType={mediaType} 
                    mediaContent={clickedMovie as IMovie}
                />
            ) : null}                       
        </AnimatePresence>
    </Wrapper>)
}

export default Slider;