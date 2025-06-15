import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, BarChart3, Users, MapPin, Building2, Target, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SentimentResult {
  company_name: string;
  stock_code: string;
  newsdesc: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  people_names: string[];
  places_names: string[];
  other_companies_referred: string[];
  related_industries: string[];
  market_implications: string;
  confidence_score: number;
}

const mockResults: Record<string, SentimentResult> = {
  'Apple Inc': {
    company_name: 'Apple Inc',
    stock_code: 'AAPL',
    newsdesc: 'Apple announces record quarterly earnings driven by strong iPhone 15 sales and services growth. The company also unveiled new AI features for iOS 18.',
    sentiment: 'Positive',
    people_names: ['Tim Cook', 'Luca Maestri'],
    places_names: ['Cupertino', 'China', 'Europe'],
    other_companies_referred: ['Samsung', 'Google', 'Microsoft'],
    related_industries: ['Technology', 'Consumer Electronics', 'Software', 'Artificial Intelligence'],
    market_implications: 'Strong earnings beat expectations, likely to drive stock price higher. AI integration positions Apple well for future growth.',
    confidence_score: 0.87
  },
  'Microsoft': {
    company_name: 'Microsoft',
    stock_code: 'MSFT',
    newsdesc: 'Microsoft reports strong cloud growth with Azure revenue up 30% year-over-year. Copilot AI integration across Office suite shows promising adoption rates.',
    sentiment: 'Positive',
    people_names: ['Satya Nadella', 'Amy Hood'],
    places_names: ['Redmond', 'United States', 'Global'],
    other_companies_referred: ['Amazon', 'Google', 'OpenAI'],
    related_industries: ['Cloud Computing', 'Software', 'Artificial Intelligence', 'Enterprise Solutions'],
    market_implications: 'Azure growth continues to outpace competitors. AI integration creating new revenue streams and competitive advantages.',
    confidence_score: 0.92
  },
  'Google': {
    company_name: 'Google',
    stock_code: 'GOOGL',
    newsdesc: 'Alphabet faces regulatory challenges in Europe over search monopoly concerns. However, Google Cloud shows strong growth and Bard AI gains market traction.',
    sentiment: 'Neutral',
    people_names: ['Sundar Pichai', 'Ruth Porat'],
    places_names: ['Mountain View', 'Europe', 'Brussels'],
    other_companies_referred: ['Microsoft', 'Amazon', 'Apple'],
    related_industries: ['Search', 'Cloud Computing', 'Artificial Intelligence', 'Digital Advertising'],
    market_implications: 'Regulatory headwinds may impact search revenue, but cloud and AI growth provide positive offset. Mixed signals for near-term performance.',
    confidence_score: 0.74
  }
};

const sentimentData = [
  { name: 'Positive', value: 45, color: '#10b981' },
  { name: 'Neutral', value: 35, color: '#f59e0b' },
  { name: 'Negative', value: 20, color: '#ef4444' }
];

const industryData = [
  { industry: 'Technology', sentiment: 85 },
  { industry: 'Healthcare', sentiment: 72 },
  { industry: 'Finance', sentiment: 58 },
  { industry: 'Energy', sentiment: 45 },
  { industry: 'Retail', sentiment: 63 }
];

function App() {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const companies = Object.keys(mockResults);

  const handleAnalyze = async () => {
    if (!selectedCompany) return;
    
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult(mockResults[selectedCompany]);
    setIsAnalyzing(false);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'Negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Negative':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Market Sentiment Analyzer</h1>
              <p className="text-gray-600 mt-1">Real-time sentiment analysis powered by AI</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analysis Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Company Analysis</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Select Company
              </label>
              <select
                id="company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Choose a company...</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company} ({mockResults[company].stock_code})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleAnalyze}
                disabled={!selectedCompany || isAnalyzing}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-8">
            {/* Main Result Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{result.company_name}</h3>
                  <p className="text-gray-600 font-mono text-lg">{result.stock_code}</p>
                </div>
                <div className={`px-4 py-2 rounded-full border-2 flex items-center space-x-2 ${getSentimentColor(result.sentiment)}`}>
                  {getSentimentIcon(result.sentiment)}
                  <span className="font-semibold">{result.sentiment}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">News Summary</h4>
                <p className="text-gray-700 leading-relaxed">{result.newsdesc}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Market Implications</h4>
                <p className="text-gray-700 leading-relaxed">{result.market_implications}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Confidence Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence_score * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-900">{Math.round(result.confidence_score * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Entity Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-purple-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Key People</h4>
                </div>
                <div className="space-y-2">
                  {result.people_names.map((person, index) => (
                    <span key={index} className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-green-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Locations</h4>
                </div>
                <div className="space-y-2">
                  {result.places_names.map((place, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Building2 className="w-6 h-6 text-blue-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Companies</h4>
                </div>
                <div className="space-y-2">
                  {result.other_companies_referred.map((company, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-orange-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Industries</h4>
                </div>
                <div className="space-y-2">
                  {result.related_industries.map((industry, index) => (
                    <span key={index} className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Sentiment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Industry Sentiment Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sentiment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;