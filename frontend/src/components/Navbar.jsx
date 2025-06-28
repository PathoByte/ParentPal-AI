import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Heading, HStack, Button } from "@chakra-ui/react";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    variant: location.pathname === path ? "solid" : "ghost",
    colorScheme: location.pathname === path ? "blue" : "gray",
  });

  return (
    <Box
      as="nav"
      bgGradient="linear(to-r, blue.500, pink.400)"
      color="white"
      px={8}
      py={4}
      boxShadow="md"
    >
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Heading size="md" letterSpacing="wide">
          Homework Helper
        </Heading>
        <HStack spacing={4}>
          <Button
            as={Link}
            to="/"
            {...linkStyle("/")}
            _hover={{ transform: "scale(1.05)", bg: "blue.600" }}
          >
            Home
          </Button>
          <Button
            as={Link}
            to="/ask"
            {...linkStyle("/ask")}
            _hover={{ transform: "scale(1.05)", bg: "blue.600" }}
          >
            Ask
          </Button>
          <Button
            as={Link}
            to="/pricing"
            {...linkStyle("/pricing")}
            _hover={{ transform: "scale(1.05)", bg: "blue.600" }}
          >
            Pricing
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
