import "./App.css";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";

// components
import Home from "./Pages/Home";
import Create from "./Pages/Create/Create";
import Snake from "./Pages/Snake/Snake";
import Add from "./Pages/Create/Add";

import theme from "./theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="90vh">
        <Container maxW="375px" flex={1} pt={4}>
          {/* content */}
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/snake/:snakeId" element={<Snake />} />
              <Route path="/snake/:parentSnakeId/add" element={<Add />} />
            </Routes>
          </Router>
        </Container>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
