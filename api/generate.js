export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { skill, experience, interests, time, monetization, income, tone } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `Act as a business strategist and idea architect.
Generate 5 profitable business or side-hustle ideas that transform this person's existing skills and interests into clear, monetizable offers.
Each idea must include a defined audience, monetization path, and first actionable step — ready to execute immediately.

INPUT DETAILS:
• Primary Skill / Background: ${skill}
• Experience Level: ${experience}
• Interests or Passions: ${interests}
• Available Time: ${time}
• Monetization Type: ${monetization}
• Income Goal: ${income}
• Tone & Style: ${tone}

REQUIRED STRUCTURE:
1. Start with a "Skill Snapshot" — brief summary of the person's core strengths (2-3 sentences)

2. Then provide 5 Business Ideas, each formatted as:

**[Idea Number]. [Business Idea Name]**

**Target Audience:** [specific description]

**Monetization Path:** [clear revenue model with price ranges]

**Why It Fits:** [connection between their skills and this opportunity]

**Next Step:** [single concrete action to validate or start]

---

REQUIREMENTS:
• Prioritize realistic, low-barrier ideas with clear revenue potential
• Include at least one service-based and one digital-product concept
• Tie every idea directly to their skills: ${skill} and interests: ${interests}
• Offer concrete validation or launch steps, not generic advice
• Use a ${tone} tone throughout
• Make ideas specific to their ${experience} level and ${time} availability

End with: "Word Count: [approximate count] | All Checks ✅"`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return res.status(response.status).json({ 
        error: `API request failed: ${response.status}` 
      });
    }

    const data = await response.json();
    const content = data.content[0].text;

    return res.status(200).json({ content });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate ideas' 
    });
  }
}
