// AI-Powered Categorization and Suggestion System

const CATEGORIES = {
  'programming': ['code', 'bug', 'error', 'javascript', 'python', 'react', 'function', 'debug', 'syntax'],
  'web-development': ['website', 'html', 'css', 'frontend', 'backend', 'api', 'deploy'],
  'mobile-development': ['app', 'ios', 'android', 'react-native', 'flutter', 'mobile'],
  'database': ['database', 'sql', 'nosql', 'mongodb', 'firebase', 'query', 'schema'],
  'data-science': ['data', 'machine-learning', 'ai', 'python', 'analysis', 'visualization', 'dataset'],
  'design': ['ui', 'ux', 'design', 'figma', 'component', 'layout', 'styling'],
  'devops': ['deploy', 'server', 'docker', 'kubernetes', 'ci-cd', 'linux', 'aws'],
  'other': []
};

const URGENCY_KEYWORDS = {
  high: ['urgent', 'asap', 'emergency', 'critical', 'immediate', 'blocking', 'deadline', 'today'],
  medium: ['soon', 'need', 'help', 'important', 'required', 'necessary'],
  low: ['eventually', 'sometime', 'when possible', 'whenever', 'optional', 'sometime soon']
};

export function categorizeRequest(text: string): string {
  const lowerText = text.toLowerCase();
  let bestCategory = 'other';
  let bestMatch = 0;

  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    const matches = keywords.filter(keyword => 
      lowerText.includes(keyword)
    ).length;
    
    if (matches > bestMatch) {
      bestMatch = matches;
      bestCategory = category;
    }
  }

  return bestCategory;
}

export function detectUrgency(text: string): 'low' | 'medium' | 'high' {
  const lowerText = text.toLowerCase();
  
  const highMatches = URGENCY_KEYWORDS.high.filter(keyword => lowerText.includes(keyword)).length;
  const mediumMatches = URGENCY_KEYWORDS.medium.filter(keyword => lowerText.includes(keyword)).length;
  const lowMatches = URGENCY_KEYWORDS.low.filter(keyword => lowerText.includes(keyword)).length;

  if (highMatches > 0) return 'high';
  if (mediumMatches > 2) return 'medium';
  if (lowMatches > 0) return 'low';
  
  return 'medium'; // default
}

export function suggestTags(text: string): string[] {
  const lowerText = text.toLowerCase();
  const tags = new Set<string>();

  // Smart tag suggestion based on keywords
  if (lowerText.includes('beginner') || lowerText.includes('new to')) {
    tags.add('beginner-friendly');
  }
  if (lowerText.includes('debug') || lowerText.includes('error') || lowerText.includes('fix')) {
    tags.add('debugging');
  }
  if (lowerText.includes('review') || lowerText.includes('feedback')) {
    tags.add('review-needed');
  }
  if (lowerText.includes('learn') || lowerText.includes('tutorial')) {
    tags.add('learning');
  }
  if (lowerText.includes('best') || lowerText.includes('practice') || lowerText.includes('optimize')) {
    tags.add('best-practices');
  }
  if (lowerText.includes('architecture') || lowerText.includes('design pattern')) {
    tags.add('architecture');
  }
  if (lowerText.includes('project')) {
    tags.add('project');
  }
  if (lowerText.includes('?') || lowerText.includes('how') || lowerText.includes('what')) {
    tags.add('question');
  }

  if (tags.size === 0) {
    tags.add('help-wanted');
  }

  return Array.from(tags).slice(0, 5);
}

export function improveRequestText(text: string): string {
  let improved = text.trim();
  
  // Add period if missing
  if (improved && !improved.endsWith('.') && !improved.endsWith('!') && !improved.endsWith('?')) {
    improved += '.';
  }

  // Capitalize first letter
  improved = improved.charAt(0).toUpperCase() + improved.slice(1);

  return improved;
}

export function generateAISummary(title: string, description: string): string {
  const category = categorizeRequest(`${title} ${description}`);
  const urgency = detectUrgency(description);
  
  const summaryTemplate = `
    This is a ${urgency}-priority ${category} request. 
    ${title}. ${description.substring(0, 150)}${description.length > 150 ? '...' : ''}
  `.trim();

  return summaryTemplate;
}

export function calculateRelevanceScore(userSkills: string[], requestCategory: string, requestTags: string[]): number {
  let score = 0;

  // Exact skill match
  const categoryKeywords = CATEGORIES[requestCategory as keyof typeof CATEGORIES] || [];
  const skillMatches = userSkills.filter(skill =>
    categoryKeywords.some(keyword =>
      skill.toLowerCase().includes(keyword) || keyword.includes(skill.toLowerCase())
    )
  ).length;

  score += skillMatches * 25;

  // Tag-based scoring
  const commonTags = userSkills.filter(skill =>
    requestTags.some(tag => tag.includes(skill.toLowerCase()) || skill.toLowerCase().includes(tag))
  ).length;

  score += commonTags * 15;

  // Cap score at 100
  return Math.min(score, 100);
}

export function getSkillSuggestions(currentSkills: string[]): string[] {
  const allSkills = Array.from(
    new Set(Object.values(CATEGORIES).flat())
  ).filter(skill => !currentSkills.some(current => current.toLowerCase().includes(skill)));

  return allSkills.slice(0, 10);
}

export function getInterestSuggestions(currentInterests: string[]): string[] {
  const allInterests = [
    'Teaching others',
    'Learning new technologies',
    'Solving complex problems',
    'Open source contribution',
    'Community building',
    'Mentorship',
    'Innovation',
    'Collaboration',
    'Research',
    'Best practices'
  ].filter(interest => !currentInterests.includes(interest));

  return allInterests.slice(0, 5);
}

export function getAreaOfNeedSuggestions(userSkills: string[], area: 'help' | 'need'): string[] {
  if (area === 'need') {
    return getSkillSuggestions(userSkills);
  } else {
    return getInterestSuggestions(userSkills);
  }
}
