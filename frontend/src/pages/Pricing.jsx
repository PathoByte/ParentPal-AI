import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import PaymentModal from "../components/PaymentModal";

export default function Pricing() {
  return (
    <Box p={8} maxW="lg" mx="auto" mt={10} textAlign="center">
      <VStack spacing={6}>
        <Text fontSize="3xl" fontWeight="bold" color="blue.700">
          Subscription Plans
        </Text>
        <Text fontSize="md" color="gray.600">
          Try for free. Upgrade for unlimited questions!
        </Text>
        <PaymentModal />
      </VStack>
    </Box>
  );
}
