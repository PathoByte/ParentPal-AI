import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Input, 
  Text, 
  VStack, 
  Spinner, 
  useToast 
} from "@chakra-ui/react";
import axios from "axios";

const UploadBox = ({ onResult }) => {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() && !file) {
      toast({
        title: "Please type a question or upload an image.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (question) formData.append("question", question);

    try {
      const response = await axios.post("http://127.0.0.1:8000/explain", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(response.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Oops!",
        description: "Something went wrong. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Text fontWeight="medium" color="gray.600">Type your question:</Text>
        <Input 
          placeholder="E.g. Solve x^2 - 4 = 0" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          size="lg"
          focusBorderColor="blue.400"
        />

        <Text textAlign="center" color="gray.500">OR</Text>

        <Input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          size="lg"
        />

        <Button 
          type="submit" 
          colorScheme="blue" 
          size="lg"
          isDisabled={loading}
          _hover={{ boxShadow: "lg" }}
        >
          {loading ? <Spinner size="sm" /> : "Get Explanation"}
        </Button>
      </VStack>
    </Box>
  );
};

export default UploadBox;
