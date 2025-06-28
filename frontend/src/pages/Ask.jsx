import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Divider,
  useToast,
  Spinner,
  Fade,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdQuestionAnswer } from "react-icons/md";
import UploadBox from "../components/UploadBox";
import { useNavigate } from "react-router-dom";

export default function Ask() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast({
        title: "Type your question first!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question }),
      });
      const data = await response.json();
      console.log("AI response:", data);

      navigate("/answer", { state: { data } });
    } catch (err) {
      toast({
        title: "Oops! Something went wrong.",
        description: "Try again in a moment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in>
      <Box
        p={8}
        bgGradient="linear(to-br, blue.200, pink.100)"
        boxShadow="2xl"
        borderRadius="2xl"
        maxW="lg"
        mx="auto"
        mt={10}
        _hover={{ boxShadow: "0 0 30px rgba(66, 153, 225, 0.6)" }}
        transition="all 0.3s"
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Icon
              as={MdQuestionAnswer}
              boxSize={14}
              color="blue.600"
              mb={2}
              className="pulse-icon"
            />
            <Text fontSize="3xl" fontWeight="extrabold" color="blue.700">
              Need Homework Help?
            </Text>
            <Text fontSize="lg" color="gray.700">
              Upload a photo or type your question below.
            </Text>
          </Box>

          <UploadBox onResult={(data) => {
            console.log("AI result:", data);
            navigate("/answer", { state: { data } });
          }} />

          <Divider my={4} borderColor="blue.400" opacity={0.8} />

          <Input
            placeholder="Type your homework question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            size="lg"
            focusBorderColor="pink.400"
            bg="white"
            _hover={{ boxShadow: "md" }}
            transition="all 0.2s"
          />

          <Button
            colorScheme="pink"
            size="lg"
            onClick={handleSubmit}
            isDisabled={loading}
            _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            transition="all 0.3s"
          >
            {loading ? <Spinner size="sm" /> : "Get Answer"}
          </Button>
        </VStack>
      </Box>

      <style>
        {`
          .pulse-icon {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Fade>
  );
}
