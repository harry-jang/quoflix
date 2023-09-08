import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 30vw;
  gap: 20px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  visible: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" }
};

const getTransformProperties = (custom: any) => {
  switch (custom) {
    case "1":
      return { scale: 1.1, transformOrigin: "right bottom" };
    case "2":
      return { scale: 1.1, transformOrigin: "left bottom" };
    case "3":
      return { scale: 1.1, transformOrigin: "right top" };
    case "4":
      return { scale: 1.1, transformOrigin: "left top" };
    default:
      return { scale: 1 };
  }
};

const box = {
  hover: (custom: any) => getTransformProperties(custom)
};

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;

  background-color: white;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [id, setId] = useState<null|string>(null );
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={box}
            custom={n}
            onClick={() => setId(n)}
            whileHover="hover"
            key={n}
            layoutId={n}
          >
            {!clicked && n === "2" ? <Circle layoutId="circle" /> : null}
            {clicked && n === "3" ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: 300,
                height: 200,
                backgroundColor: "rgba(255, 255, 255, 1)"
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <button onClick={toggleClicked} style={{ marginTop: "20px" }}>
        Switch
      </button>
    </Wrapper>
  );
}

export default App;
