# Real-Time Market Sentiment Analyzer

This project implements a LangChain-powered pipeline to analyze market sentiment for a given company using Yahoo Finance news and Azure OpenAI GPT-4o. The application features both a Python backend for sentiment analysis and a React frontend for visualization.

## Tech Stack

### Backend
- **LLM:** Azure OpenAI (gpt-4o-mini)
- **Frameworks:** LangChain, Langfuse
- **Data Source:** Yahoo Finance
- **Language:** Python 3.12+
- **Environment Management:** `venv` + `.env`

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Python 3.12+ (for backend analysis)

### Frontend Setup (React Application)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/market-sentiment-analyzer.git
   cd market-sentiment-analyzer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   The application will be available at `http://localhost:5173`

### Backend Setup (Python Analysis Engine)

1. **Create Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`
   - Fill in your Azure OpenAI and Langfuse credentials:
   ```bash
   cp .env.example .env
   ```

4. **Run the Python Analyzer**:
   ```bash
   python market_sentiment_analyzer.py
   ```

## Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `python market_sentiment_analyzer.py` - Run sentiment analysis
- `python test_openai_call.py` - Test Azure OpenAI connection

## Project Structure

```
├── src/                    # React frontend source
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles
├── market_sentiment_analyzer.py  # Python sentiment analysis engine
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies and scripts
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Features

- **Real-time Sentiment Analysis**: Analyze market sentiment for major companies
- **Interactive Dashboard**: Modern React interface with charts and visualizations
- **Entity Extraction**: Identify key people, places, companies, and industries
- **Confidence Scoring**: AI-powered confidence metrics for sentiment analysis
- **Responsive Design**: Works on desktop and mobile devices

## Usage

1. Start the React development server with `npm run dev`
2. Select a company from the dropdown (Apple Inc, Microsoft, or Google)
3. Click "Analyze" to see sentiment analysis results
4. View detailed breakdowns including:
   - Sentiment classification (Positive/Negative/Neutral)
   - Key entities (people, places, companies, industries)
   - Market implications
   - Confidence scores

## Environment Variables

Create a `.env` file with the following variables:

```env
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Langfuse Configuration
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key_here
LANGFUSE_SECRET_KEY=your_langfuse_secret_key_here

# Optional
USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.