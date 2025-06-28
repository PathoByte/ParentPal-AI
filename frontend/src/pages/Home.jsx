import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Fade } from "@chakra-ui/react";
import { MdSchool } from "react-icons/md";

const Home = () => (
  <Fade in>
    <Box
      minH="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, blue.50, pink.50)"
      px={6}
    >
      <VStack spacing={6} maxW="lg" textAlign="center" p={8} bg="whiteAlpha.800" borderRadius="xl" boxShadow="lg">
        <MdSchool size={48} color="#2B6CB0" />
        <Heading color="blue.700">Welcome to Homework Helper</Heading>
        <Text fontSize="lg" color="gray.700">
          Helping busy parents support their kids with friendly, simple explanations.
        </Text>
        <Button
          as={Link}
          to="/ask"
          colorScheme="blue"
          size="lg"
          _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  </Fade>
);

export default Home;
