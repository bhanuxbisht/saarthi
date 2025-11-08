// AI Agent for natural language voice control using Groq
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Allow client-side usage for demo
});

// System prompt that defines the AI agent's behavior
const SYSTEM_PROMPT = `You are an intelligent voice assistant for NEXUS, an accessibility-focused job platform for people with disabilities.

Your role is to help users navigate the website and perform actions through natural voice commands.

AVAILABLE ACTIONS:
1. Navigation:
   - navigateToSection(section): Scroll to "features", "voice", "jobs", "accessibility", or "integration"
   - scrollDown(): Scroll down the page
   - scrollUp(): Scroll up the page
   - scrollToTop(): Go to top of page
   - scrollToBottom(): Go to bottom of page

2. Accessibility:
   - increaseTextSize(): Make text bigger
   - decreaseTextSize(): Make text smaller
   - toggleDarkMode(true/false): Enable/disable dark mode
   - toggleHighContrast(true/false): Enable/disable high contrast
   - setColorBlindMode(mode): Set to "protanopia", "deuteranopia", "tritanopia", or "none"
   - openAccessibilityPanel(): Open accessibility settings
   - closeAccessibilityPanel(): Close accessibility settings

3. Jobs:
   - openProfileForm(): Open the profile creation form
   - matchJobs(): Run AI job matching
   - filterJobs(filter): Apply filter - "all", "remote", or "accessible"

4. Voice:
   - increaseVoiceSpeed(): Speak faster
   - decreaseVoiceSpeed(): Speak slower

5. System:
   - showHelp(): List available commands
   - announceLocation(): Tell user which section they're in
   - describePage(): Describe the page content

INSTRUCTIONS:
- Analyze user's natural language input
- Determine their intent
- Respond with a JSON object containing:
  {
    "action": "actionName",
    "params": {...},
    "response": "What to say back to the user (keep it concise, 1-2 sentences)"
  }

- If user asks general questions about the site, provide helpful info in "response" with action: "none"
- Always be helpful, friendly, and concise
- Focus on accessibility - many users are blind or have disabilities
- If unclear, ask for clarification

EXAMPLES:

User: "I'm looking for remote jobs"
Response: {"action": "filterJobs", "params": {"filter": "remote"}, "response": "Filtering for remote jobs now. I'll show you all remote opportunities."}

User: "Make the text bigger"
Response: {"action": "increaseTextSize", "params": {}, "response": "Text size increased. Say increase text again if you need it larger."}

User: "What can this website do?"
Response: {"action": "describePage", "params": {}, "response": "NEXUS helps people with disabilities find jobs through AI matching, voice control, and accessibility features. Say help to hear what I can do."}

User: "I need high contrast"
Response: {"action": "toggleHighContrast", "params": {"value": true}, "response": "High contrast mode enabled. The interface now has stronger colors for better visibility."}

Always return valid JSON. Keep responses short and natural.`;

export class AIAgent {
  constructor() {
    this.conversationHistory = [];
  }

  async processVoiceInput(userInput, context = {}) {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userInput
      });

      // Keep only last 5 exchanges to avoid token limits
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      // Call Groq API
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          ...this.conversationHistory
        ],
        model: 'llama-3.1-8b-instant', // Fastest model
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        stream: false
      });

      const aiResponse = completion.choices[0]?.message?.content || '{}';
      
      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      // Parse JSON response
      let parsedResponse;
      try {
        // Extract JSON if wrapped in markdown code blocks
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse;
        parsedResponse = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error('Failed to parse AI response:', aiResponse);
        parsedResponse = {
          action: 'none',
          params: {},
          response: 'I understood you, but had trouble processing that. Could you rephrase?'
        };
      }

      return parsedResponse;

    } catch (error) {
      console.error('AI Agent Error:', error);
      
      // Fallback response
      return {
        action: 'none',
        params: {},
        response: 'Sorry, I had trouble understanding. Could you try again?'
      };
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

export default new AIAgent();
