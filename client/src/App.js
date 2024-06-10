import "./App.css";
import { ChakraProvider, Container } from "@chakra-ui/react";

// components
import Home from "./Pages/Home";
import Create from "./Pages/Create/Create";

import theme from "./theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="375px" borderWidth={1} pb={10}>
        {/* content */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Router>

        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
