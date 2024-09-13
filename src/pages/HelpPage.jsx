import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Avatar, TextField, Button, IconButton } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import Layout from '../layout/Layout';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HelpPage = () => {
  const [messages, setMessages] = useState([{ id: 0, sender: 'Support Bot', text: 'Hey, how can I help you?', type: 'bot' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;
  const [jobs, setJobs] = useState([]);
  const API_KEY = "AIzaSyDglAXjJWGXJ3ggOSMv25jXfZP5VqdUK-U";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const summarizeCompanyData = (companyData) => {
    return companyData.map(company => {
      return `${company.jobTitle} at ${company.companyName}, Job Type: ${company.jobType}, Salary: ${company.CTC}`;
    }).join("; ");
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${backendServer}/getJobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchJobs();
  }, [backendServer]);
  const companySummary = summarizeCompanyData(jobs);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { id: messages.length + 1, sender: 'Student', text: input, type: 'user' }];
    setMessages(newMessages);
    setInput('');

    const aiResponse = await getAiResponse(input);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: 'Support Bot', text: aiResponse, type: 'bot' },
    ]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const getAiResponse = async (query) => {
    const prompt = `
      Act as a chatbot integrated into a training and placement center of a college. You will be given a summary of company details that have come for placement. Answer the questions based on this information. Provide short, concise, and to-the-point answers.

      Company data: ${companySummary}

      Query: ${query}
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Layout>
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f7f7f7',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '600px',
          margin: 'auto',
          padding: 2,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, color: '#1976d2' }}>
          Support Chat
        </Typography>
        <Box sx={{ flex: 1, overflowY: 'auto', padding: '20px', bgcolor: 'white', borderRadius: 2 }}>
          {messages.map((message) => (
            <Card
              key={message.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '10px',
                backgroundColor: message.type === 'user' ? '#e3f2fd' : '#f1f8e9',
                alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                boxShadow: 1,
              }}
            >
              <Avatar
                sx={{ margin: '10px', backgroundColor: message.type === 'user' ? '#1976d2' : '#4caf50' }}
              >
                {message.type === 'user' ? <ChatBubbleOutlineIcon /> : <SupportAgentIcon />}
              </Avatar>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {message.sender}
                </Typography>
                <Typography variant="body1">{message.text}</Typography>
              </CardContent>
            </Card>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#ffffff', borderRadius: 2 }}>
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your query..."
          />
          <IconButton color="primary" onClick={handleSend} sx={{ marginLeft: '10px' }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Layout>
  );
};

export default HelpPage;
