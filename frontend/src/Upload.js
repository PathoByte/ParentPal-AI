import { useState } from 'react';  
import { Box, Button, Input, Text } from '@chakra-ui/react';  

export default function Upload() {  
  const [file, setFile] = useState(null);  
  const [text, setText] = useState('');  

  const handleSubmit = async () => {  
    const formData = new FormData();  
    if (file) formData.append('image', file);  
    else formData.append('text', text);  

    const response = await axios.post('http://localhost:5000/api/ask', formData);  
    console.log(response.data.answer); // Display this in a "Result" component  
  };  

  return (  
    <Box>  
      <Input type="file" onChange={(e) => setFile(e.target.files[0])} />  
      <Text>OR</Text>  
      <Input placeholder="Type question..." value={text} onChange={(e) => setText(e.target.files[0])} />  
      <Button onClick={handleSubmit}>Get Answer</Button>  
    </Box>  
  );  
}  