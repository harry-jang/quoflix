import React from 'react';
import styled from "styled-components";
import { animate, motion } from "framer-motion"

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  place-self: center;
  background-color: white;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: {scale:1.5, rotateZ: 90},
  click: {borderRadius:"100px", scale:1},
  drag: {
    backgroundColor:"rgb(0, 168, 255)", 
    transition: {
      duration: 1
    }
  }
}


function App() {
  return (
    <Wrapper>
      <Box drag variants={boxVariants} whileHover="hover" whileDrag="drag" whileTap="click" />
    </Wrapper>
  );
}

export default App;
