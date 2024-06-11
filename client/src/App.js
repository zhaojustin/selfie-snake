import "./App.css";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";

// components
import Home from "./Pages/Home";
import Create from "./Pages/Create/Create";

import theme from "./theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh">
        <Container maxW="375px" borderWidth={1} flex={1} py={4}>
          {/* content */}
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Router>
        </Container>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
