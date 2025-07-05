import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import Pricing from "./pages/Pricing";
import Answer from "./pages/Answer";
import { checkBackendStatus } from "./services/api";

export default function App() {
  const [backendConnected, setBackendConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        const isConnected = await checkBackendStatus();
        setBackendConnected(isConnected);
      } catch (error) {
        console.error("Backend connection error:", error);
        setBackendConnected(false);
      } finally {
        setLoading(false);
      }
    };

    verifyConnection();
    
    // Optional: Set up periodic connection checks
    const interval = setInterval(verifyConnection, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <ChakraProvider>
        <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
          <Spinner size="xl" />
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          {!backendConnected && (
            <Alert status="error">
              <AlertIcon />
              Backend connection failed - some features may not work
            </Alert>
          )}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home backendConnected={backendConnected} />} />
            <Route 
              path="/ask" 
              element={<Ask backendConnected={backendConnected} />} 
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route 
              path="/answer" 
              element={<Answer backendConnected={backendConnected} />} 
            />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}