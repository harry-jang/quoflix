import { motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ListType, MediaType } from "../Constants";
import { makeImagePath } from "../utils";
import { IMovie } from "../api";

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    z-index: 99;
`;

const Wrapper = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin:0 auto;
    overflow: auto;
    border-radius: 15px;
    z-index: 100;
    background-color: ${(props) => props.theme.black.lighter};
`;

const ModalCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
`;

const ModalTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 10px;
    font-size:46px;
    position: relative;
    top: -80px;
`;

const ModalOverview = styled.p`
    padding:20px;
    position: relative;
    top: -80px;
    color: ${(props) => props.theme.white.lighter};
`;

export interface IModal {
    dataId: number;
    listType : ListType;
    mediaType : MediaType;
    mediaContent: IMovie;
}

function Modal({dataId, listType, mediaType, mediaContent} : IModal) {
    const navigate = useNavigate();
    const modalMatch = useMatch(`/${mediaType}/${listType}/:id`);

    const onOverlayClick = () => {
        if(mediaType === MediaType.tv) {
            return navigate(`/${mediaType}`)
        }

        return navigate(`/`)
    }
    const { scrollY } = useScroll();

    console.log("Modal mediaType:", mediaType);

    return (
        <>
            <Overlay 
                onClick={onOverlayClick} 
                animate={{ opacity : 1}} 
                exit={{ opacity : 0}}/>
            <Wrapper 
                layoutId={listType + "_" + modalMatch?.params.id}
                style={{ top :  scrollY.get()-400 }}
            >
                <ModalCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(mediaContent.backdrop_path, "w500")})`}} />
                <ModalTitle>{mediaContent.title? mediaContent.title : mediaContent.name}</ModalTitle>
                <ModalOverview>{mediaContent.overview}</ModalOverview>
            </Wrapper>                
        </>
    )
}

export default Modal;