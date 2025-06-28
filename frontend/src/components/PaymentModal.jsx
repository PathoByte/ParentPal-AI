import React from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";

export default function PaymentModal() {
  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg={bg}
      borderColor={border}
      boxShadow="md"
      maxW="sm"
      mx="auto"
      mt={8}
      textAlign="center"
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="blue.600">
          Monthly Plan
        </Text>
        <Text>
          <strong>KES 200</strong> — unlimited questions
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          isDisabled
          _disabled={{
            opacity: 0.6,
            cursor: "not-allowed",
          }}
        >
          Pay (Coming Soon)
        </Button>
      </VStack>
    </Box>
  );
}
