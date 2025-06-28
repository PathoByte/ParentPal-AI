import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

export default function Answer() {
  const location = useLocation();
  const data = location.state?.data;

  console.log("Received data on Answer page:", data);

  return (
    <Box p={8}>
      <Text fontSize="xl" fontWeight="bold">
        AI Answer:
      </Text>
      <Text mt={4}>
        {data ? JSON.stringify(data) : "No data received."}
      </Text>
    </Box>
  );
}
