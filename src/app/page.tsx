'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, Code, FileText, Zap, Copy, Download, BarChart3, Search, GraduationCap, Briefcase, Lightbulb, CheckCircle } from 'lucide-react'

export default function PromptCraft() {
  const [prompt, setPrompt] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [activeTemplate, setActiveTemplate] = useState('')
  const [promptHistory, setPromptHistory] = useState<Array<{id: string, prompt: string, timestamp: Date, isFavorite: boolean}>>([])
  const [showHistory, setShowHistory] = useState(false)
  const [validationResults, setValidationResults] = useState<{score: number, issues: string[], suggestions: string[]}>({score: 0, issues: [], suggestions: []})
  const [showValidation, setShowValidation] = useState(false)

  const templates = {
    writing: {
      name: 'Creative Writing',
      icon: FileText,
      prompt: `You are a creative writing assistant. Help me write engaging content.

Task: [SPECIFY_TASK]
Style: [SPECIFY_STYLE] 
Tone: [SPECIFY_TONE]
Length: [SPECIFY_LENGTH]
Target Audience: [SPECIFY_AUDIENCE]

Requirements:
- Be creative and engaging
- Follow the specified style and tone
- Include vivid descriptions
- Maintain consistency throughout`
    },
    marketing: {
      name: 'Marketing Copy',
      icon: Zap,
      prompt: `You are a marketing copywriter expert. Create compelling marketing content.

Product/Service: [PRODUCT_NAME]
Target Audience: [TARGET_AUDIENCE]
Goal: [MARKETING_GOAL]
Platform: [PLATFORM]
Key Benefits: [LIST_BENEFITS]

Requirements:
- Create attention-grabbing headlines
- Include clear call-to-action
- Highlight unique value proposition
- Use persuasive language
- Optimize for the specified platform`
    },
    coding: {
      name: 'Code Generation',
      icon: Code,
      prompt: `You are an expert software developer. Help me with coding tasks.

Language: [PROGRAMMING_LANGUAGE]
Task: [CODING_TASK]
Requirements: [SPECIFIC_REQUIREMENTS]
Framework/Library: [IF_APPLICABLE]

Please provide:
- Clean, well-commented code
- Best practices implementation
- Error handling where appropriate
- Performance considerations
- Brief explanation of the solution`
    },
    analysis: {
      name: 'Data Analysis',
      icon: BarChart3,
      prompt: `You are a data analysis expert. Help me analyze and interpret data.

Dataset: [DESCRIBE_DATASET]
Analysis Goal: [WHAT_TO_ANALYZE]
Key Metrics: [IMPORTANT_METRICS]
Context: [BUSINESS_CONTEXT]

Please provide:
- Statistical insights and trends
- Data visualization recommendations
- Key findings and patterns
- Actionable recommendations
- Potential limitations or caveats`
    },
    research: {
      name: 'Research Assistant',
      icon: Search,
      prompt: `You are a research assistant. Help me conduct thorough research on any topic.

Research Topic: [TOPIC]
Research Depth: [BASIC/INTERMEDIATE/ADVANCED]
Sources Needed: [ACADEMIC/NEWS/INDUSTRY/ALL]
Focus Areas: [SPECIFIC_ASPECTS]

Requirements:
- Provide comprehensive overview
- Include credible sources
- Present multiple perspectives
- Summarize key findings
- Suggest further research directions`
    },
    education: {
      name: 'Educational Content',
      icon: GraduationCap,
      prompt: `You are an educational content creator. Design effective learning materials.

Subject: [SUBJECT_AREA]
Learning Level: [BEGINNER/INTERMEDIATE/ADVANCED]
Learning Objectives: [WHAT_STUDENTS_SHOULD_LEARN]
Format: [LESSON/QUIZ/EXERCISE/EXPLANATION]
Duration: [TIME_CONSTRAINT]

Requirements:
- Clear and engaging explanations
- Progressive difficulty structure
- Interactive elements where appropriate
- Assessment opportunities
- Real-world applications`
    },
    business: {
      name: 'Business Strategy',
      icon: Briefcase,
      prompt: `You are a business strategy consultant. Provide strategic business insights.

Business Context: [COMPANY/INDUSTRY]
Challenge/Opportunity: [SPECIFIC_SITUATION]
Goals: [BUSINESS_OBJECTIVES]
Resources: [AVAILABLE_RESOURCES]
Timeline: [PROJECT_TIMELINE]

Deliverables:
- Strategic recommendations
- Implementation roadmap
- Risk assessment
- Success metrics
- Resource allocation suggestions`
    },
    creative: {
      name: 'Creative Brainstorming',
      icon: Lightbulb,
      prompt: `You are a creative ideation expert. Generate innovative ideas and solutions.

Challenge: [CREATIVE_CHALLENGE]
Industry/Context: [RELEVANT_CONTEXT]
Target Outcome: [DESIRED_RESULT]
Constraints: [LIMITATIONS_OR_REQUIREMENTS]
Inspiration: [REFERENCE_POINTS]

Generate:
- Multiple creative concepts
- Unique approaches and angles
- Implementation possibilities
- Potential variations
- Next steps for development`
  }

  }

  // Load history from localStorage on component mount
  React.useEffect(() => {
    const savedHistory = localStorage.getItem('promptcraft-history')
    if (savedHistory) {
      setPromptHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save to history
  const saveToHistory = (promptText: string) => {
    const newEntry = {
      id: Date.now().toString(),
      prompt: promptText,
      timestamp: new Date(),
      isFavorite: false
    }
    const updatedHistory = [newEntry, ...promptHistory].slice(0, 50) // Keep last 50
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptcraft-history', JSON.stringify(updatedHistory))
  }

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    const updatedHistory = promptHistory.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    )
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptcraft-history', JSON.stringify(updatedHistory))
  }

  // Load prompt from history
  const loadFromHistory = (historyPrompt: string) => {
    setPrompt(historyPrompt)
    setShowHistory(false)
  }


  // Validate prompt quality and provide suggestions
  const validatePrompt = (promptText: string) => {
    const issues = []
    const suggestions = []
    let score = 100

    // Check length
    if (promptText.length < 20) {
      issues.push('Prompt is too short')
      suggestions.push('Add more context and specific requirements')
      score -= 20
    }
    if (promptText.length > 2000) {
      issues.push('Prompt is very long')
      suggestions.push('Consider breaking into smaller, focused prompts')
      score -= 10
    }

    // Check for clarity indicators
    if (!promptText.includes('?') && !promptText.toLowerCase().includes('please') && !promptText.toLowerCase().includes('create') && !promptText.toLowerCase().includes('generate')) {
      issues.push('Unclear instruction type')
      suggestions.push('Use clear action words like "create", "generate", "explain", or "analyze"')
      score -= 15
    }

    // Check for context
    if (!promptText.toLowerCase().includes('context') && !promptText.toLowerCase().includes('background') && promptText.split(' ').length < 10) {
      issues.push('Limited context provided')
      suggestions.push('Add background information or context for better results')
      score -= 10
    }

    // Check for specificity
    const vagueWords = ['something', 'anything', 'stuff', 'things', 'good', 'nice', 'better']
    const hasVagueWords = vagueWords.some(word => promptText.toLowerCase().includes(word))
    if (hasVagueWords) {
      issues.push('Contains vague language')
      suggestions.push('Replace vague terms with specific requirements and criteria')
      score -= 15
    }

    // Check for output format specification
    if (!promptText.toLowerCase().includes('format') && !promptText.toLowerCase().includes('structure') && !promptText.toLowerCase().includes('json') && !promptText.toLowerCase().includes('list')) {
      issues.push('No output format specified')
      suggestions.push('Specify desired output format (JSON, list, paragraph, etc.)')
      score -= 10
    }

    // Positive indicators
    if (promptText.includes('[') && promptText.includes(']')) {
      suggestions.push('Good use of placeholders for dynamic content')
      score += 5
    }
    if (promptText.toLowerCase().includes('example')) {
      suggestions.push('Including examples helps clarify expectations')
      score += 5
    }

    score = Math.max(0, Math.min(100, score))
    
    return { score, issues, suggestions }
  }

  // Run validation on current prompt
  const runValidation = () => {
    if (!prompt.trim()) {
      setValidationResults({score: 0, issues: ['No prompt entered'], suggestions: ['Enter a prompt to validate']})
    } else {
      const results = validatePrompt(prompt.trim())
      setValidationResults(results)
    }
    setShowValidation(true)
  }

  const generateJSON = () => {
    if (!prompt.trim()) return
    
    // Save to history
    saveToHistory(prompt.trim())

    // Analyze prompt characteristics
    const wordCount = prompt.trim().split(/\s+/).length
    const hasPlaceholders = /\[.*?\]/.test(prompt)
    const hasStructure = prompt.includes('Requirements:') || prompt.includes('Please provide:')
    
    // Template-specific parameter optimization
    const getOptimizedParameters = (templateType: string) => {
      const baseParams = {
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }

      switch (templateType) {
        case 'coding':
          return { ...baseParams, temperature: 0.3, max_tokens: 2000 }
        case 'creative':
          return { ...baseParams, temperature: 0.9, max_tokens: 1500 }
        case 'analysis':
          return { ...baseParams, temperature: 0.4, max_tokens: 1800 }
        case 'business':
          return { ...baseParams, temperature: 0.5, max_tokens: 1200 }
        case 'research':
          return { ...baseParams, temperature: 0.6, max_tokens: 2000 }
        default:
          return baseParams
      }
    }

    // Generate optimization suggestions based on prompt analysis
    const generateSuggestions = () => {
      const suggestions = []
      
      if (!hasPlaceholders) {
        suggestions.push('Consider adding placeholders [LIKE_THIS] for dynamic content')
      }
      
      if (wordCount < 20) {
        suggestions.push('Add more context and specific requirements for better results')
      }
      
      if (!hasStructure) {
        suggestions.push('Structure your prompt with clear sections (Context, Task, Requirements)')
      }
      
      if (!prompt.includes('format') && !prompt.includes('output')) {
        suggestions.push('Specify the desired output format explicitly')
      }
      
      if (activeTemplate && !prompt.toLowerCase().includes('example')) {
        suggestions.push('Include specific examples to guide the AI better')
      }

      return suggestions.length > 0 ? suggestions : ['Your prompt looks well-structured!']
    }

    const jsonStructure = {
      prompt: {
        content: prompt,
        type: activeTemplate || 'custom',
        timestamp: new Date().toISOString(),
        analysis: {
          word_count: wordCount,
          has_placeholders: hasPlaceholders,
          has_structure: hasStructure,
          complexity_score: Math.min(10, Math.floor(wordCount / 10) + (hasPlaceholders ? 2 : 0) + (hasStructure ? 3 : 0))
        }
      },
      parameters: getOptimizedParameters(activeTemplate || 'custom'),
      metadata: {
        version: '2.0',
        generated_by: 'PromptCraft',
        template_used: activeTemplate ? templates[activeTemplate as keyof typeof templates]?.name : 'Custom',
        optimization_suggestions: generateSuggestions(),
        best_practices: [
          'Test your prompt with different inputs',
          'Iterate based on AI responses',
          'Keep context relevant and concise',
          'Use clear, specific language'
        ]
      }
    }

    setJsonOutput(JSON.stringify(jsonStructure, null, 2))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadJSON = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt-config.json'
    a.click()
  }

  const applyTemplate = (templateKey: string) => {
    setActiveTemplate(templateKey)
    setPrompt(templates[templateKey as keyof typeof templates].prompt)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  PromptCraft
                </h1>
                <p className="text-sm text-gray-600">AI Prompt Engineering Assistant</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Build better prompts, generate structured JSON
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Template Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Start Templates</h2>
          <div className="flex justify-between items-center mb-4">
            <span></span>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>{showHistory ? 'Hide History' : 'Show History'}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(templates).map(([key, template]) => {
              const Icon = template.icon
              return (
                <button
                  key={key}
                  onClick={() => applyTemplate(key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                    activeTemplate === key
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activeTemplate === key ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{template.name}</h3>
                      <p className="text-sm text-gray-500">Professional template</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Prompt History</h3>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No prompts in history yet. Generate some prompts to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 truncate mb-1">{item.prompt}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-1 rounded transition-colors ${
                            item.isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-500'
                          }`}
                          title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Lightbulb className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => loadFromHistory(item.prompt)}
                          className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prompt Input */}
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Prompt Editor
              </h2>
              <p className="text-sm text-gray-600 mt-1">Write or customize your AI prompt</p>
            </div>
            <div className="p-6">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here... Use templates above for quick start!"
                className="w-full h-80 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  {prompt.length} characters
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(prompt)}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={generateJSON}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Generate JSON</span>
                  </button>
                  <button
                    onClick={runValidation}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Validate Prompt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* JSON Output */}
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Code className="h-5 w-5 mr-2 text-blue-600" />
                JSON Configuration
              </h2>
              <p className="text-sm text-gray-600 mt-1">Structured output for API integration</p>
            </div>
            <div className="p-6">
              <pre className="w-full h-80 p-4 bg-gray-50 border border-gray-200 rounded-xl overflow-auto text-sm font-mono">
                {jsonOutput || '// Your JSON configuration will appear here after generating...'}
              </pre>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  {jsonOutput ? 'Ready for API integration' : 'Generate JSON to see output'}
                </div>
                {jsonOutput && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(jsonOutput)}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={downloadJSON}
                      className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Validation Results */}
          {showValidation && (
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Prompt Validation Results
                </h2>
                <p className="text-sm text-gray-600 mt-1">Quality assessment and improvement suggestions</p>
              </div>
              <div className="p-6">
                {/* Score Display */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Quality Score</span>
                    <span className={`text-lg font-bold ${
                      validationResults.score >= 80 ? 'text-green-600' : 
                      validationResults.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {validationResults.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        validationResults.score >= 80 ? 'bg-green-500' : 
                        validationResults.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${validationResults.score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Issues */}
                {validationResults.issues.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-red-700 mb-3">Issues Found</h3>
                    <ul className="space-y-2">
                      {validationResults.issues.map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {validationResults.suggestions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">Improvement Suggestions</h3>
                    <ul className="space-y-2">
                      {validationResults.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Close Button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowValidation(false)}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Close Validation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Choose PromptCraft?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Templates</h3>
              <p className="text-gray-600">Pre-built templates for writing, marketing, and coding tasks</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">JSON Export</h3>
              <p className="text-gray-600">Generate structured JSON for seamless API integration</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Results</h3>
              <p className="text-gray-600">Real-time prompt optimization and suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
