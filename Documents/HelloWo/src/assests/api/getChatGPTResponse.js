const getChatGPTResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${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}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response?.status === 429) {
        console.error('Rate limit exceeded. Please wait and try again.');
        return 'Too many requests. Please try again after some time.';
      } else {
        console.error('Error fetching response from OpenAI:', error);
        return 'Sorry, something went wrong. Please try again later.';
      }
    }
  };
export default getChatGPTResponse;  