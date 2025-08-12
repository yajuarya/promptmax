# PromptCraft

A powerful Next.js application designed for prompt engineers to write better prompts with AI assistance and JSON generation capabilities.

## Features

### 🎯 Core Functionality
- **Prompt-to-JSON Generation**: Convert natural language prompts into structured JSON format
- **Multiple Templates**: Pre-built templates for different use cases
- **Real-time Preview**: Instant JSON output as you type

### 📚 Template Categories
- **Creative Writing**: For authors, bloggers, and content creators
- **Marketing Copy**: For marketers and copywriters
- **Code Generation**: For developers and programmers
- **Data Analysis**: For data scientists and analysts
- **Research Assistant**: For researchers and academics
- **Educational Content**: For teachers and instructors
- **Business Strategy**: For business professionals
- **Creative Brainstorming**: For ideation and innovation

### 🔧 Advanced Features
- **Prompt History**: Automatic saving of all prompts with timestamps
- **Favorites System**: Mark and organize your best prompts
- **Prompt Validation**: AI-powered quality scoring with suggestions
- **Export Options**: Copy or download generated JSON
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🎨 User Experience
- Modern, clean interface built with Tailwind CSS
- Intuitive template selection with visual icons
- Real-time validation feedback
- History panel for easy prompt management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage for client-side persistence

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd promptcraft
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Select a Template**: Choose from 8 different template categories
2. **Write Your Prompt**: Enter your prompt in the text area
3. **Generate JSON**: Click "Generate JSON" to see structured output
4. **Validate Quality**: Use "Validate Prompt" for quality assessment
5. **Save & Organize**: Prompts are automatically saved to history
6. **Export Results**: Copy or download the generated JSON

## Development

### Project Structure
```
src/
├── app/
│   ├── page.tsx          # Main application component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
```

### Key Components
- **Template System**: Modular prompt templates with customizable parameters
- **History Management**: localStorage-based persistence with favorites
- **Validation Engine**: Multi-criteria prompt quality assessment
- **JSON Generator**: Template-aware JSON structure generation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Icons provided by Lucide React
- Inspired by the prompt engineering community
