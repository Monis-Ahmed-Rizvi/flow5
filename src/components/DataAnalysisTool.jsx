import React, { useState } from 'react';
import { Upload, BarChart2, PieChart, LineChart, Activity, TrendingUp, Zap, AlertTriangle, CheckCircle, Grid, Clock, ChevronRight, ChevronLeft, Eye, RefreshCw, Save, X, Home, BarChart, Settings, User, FileText, Download, FileCheck, ArrowLeft, HelpCircle } from 'lucide-react';

const DataAnalysisTool = () => {
  // State for tracking current step in the flow
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [selectedAnalysisModel, setSelectedAnalysisModel] = useState(null);
  const [selectedVisualizations, setSelectedVisualizations] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [finalDashboard, setFinalDashboard] = useState(false);
  const [currentView, setCurrentView] = useState("main"); // 'main', 'dashboard', 'analysis', 'visualization', 'insights'
  const [showNavigation, setShowNavigation] = useState(false);
  
  // Mock data for analysis models with match percentages
  const analysisModels = [
    { id: 1, name: "Time Series Analysis", match: 92, description: "Analyze trends and patterns over time", icon: <Clock className="w-5 h-5" /> },
    { id: 2, name: "Regression Analysis", match: 87, description: "Predict relationships between variables", icon: <TrendingUp className="w-5 h-5" /> },
    { id: 3, name: "Cluster Analysis", match: 76, description: "Group similar data points together", icon: <Grid className="w-5 h-5" /> },
    { id: 4, name: "Anomaly Detection", match: 65, description: "Identify unusual patterns in data", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 5, name: "Classification", match: 58, description: "Categorize data into predefined classes", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  // Mock data for visualization options with match percentages
  const visualizationOptions = [
    { id: 1, name: "Line Chart", match: 95, description: "Show trends over time", icon: <Activity className="w-5 h-5" /> },
    { id: 2, name: "Bar Chart", match: 88, description: "Compare values across categories", icon: <BarChart2 className="w-5 h-5" /> },
    { id: 3, name: "Pie Chart", match: 74, description: "Show proportion of parts to a whole", icon: <PieChart className="w-5 h-5" /> },
    { id: 4, name: "Scatter Plot", match: 67, description: "Show correlation between variables", icon: <Zap className="w-5 h-5" /> },
    { id: 5, name: "Heat Map", match: 56, description: "Visualize data density or intensity", icon: <Grid className="w-5 h-5" /> }
  ];

  // Mock data insights
  const dataInsights = [
    "Strong positive correlation between Price and Square Footage (r=0.89)",
    "20% of properties account for 75% of total revenue",
    "Average occupancy rates show seasonal patterns with peaks in summer months",
    "Properties in downtown areas show 35% higher price volatility"
  ];

  // Handle file upload
  const handleFileUpload = (e) => {
    // In a real app, this would process the file
    // For mockup purposes, we'll just set a filename and trigger the next step
    setFileName("sales_data_2023.csv");
    setFileUploaded(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessingComplete(true);
    }, 1500);
  };

  // Handle analysis model selection
  const handleAnalysisSelect = (model) => {
    setSelectedAnalysisModel(model);
    setCurrentStep(3); // Move to visualization selection
  };

  // Handle visualization selection
  const handleVisualizationSelect = (vis) => {
    // Toggle selection
    if (selectedVisualizations.some(item => item.id === vis.id)) {
      setSelectedVisualizations(selectedVisualizations.filter(item => item.id !== vis.id));
    } else {
      setSelectedVisualizations([...selectedVisualizations, vis]);
    }
  };

  // Generate a color based on match percentage
  const getMatchColor = (match) => {
    if (match >= 90) return "bg-green-100 border-green-500 text-green-800";
    if (match >= 75) return "bg-green-50 border-green-400 text-green-700";
    if (match >= 60) return "bg-yellow-50 border-yellow-500 text-yellow-800";
    return "bg-gray-50 border-gray-400 text-gray-700";
  };

  // Render step 1: File upload
  const renderFileUpload = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Data for Analysis</h2>
        <p className="text-gray-600">Upload your CSV file to get started with automated analysis</p>
      </div>
      
      {!fileUploaded ? (
        <div 
          className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center cursor-pointer hover:bg-blue-50 transition-colors"
          onClick={handleFileUpload}
        >
          <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <p className="text-blue-600 font-medium mb-2">Click to upload or drag and drop</p>
          <p className="text-gray-500 text-sm">CSV files only (max 50MB)</p>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-gray-500">Upload complete</p>
            </div>
          </div>
          
          {processingComplete ? (
            <div>
              <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
                <p className="font-medium">Initial analysis complete!</p>
                <p className="text-sm">We've analyzed your data and have suggestions ready.</p>
              </div>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
                onClick={() => setCurrentStep(2)}
              >
                View Analysis Options
              </button>
            </div>
          ) : (
            <div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse w-2/3"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Processing data, please wait...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Render step 2: Analysis model selection with heat map visualization
  const renderAnalysisSelection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended Analysis Models</h2>
        <p className="text-gray-600">Based on your data, we recommend these analysis models (color indicates relevance)</p>
      </div>
      
      <div className="grid gap-4 mb-6">
        {analysisModels.map(model => (
          <div 
            key={model.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${getMatchColor(model.match)}`}
            onClick={() => handleAnalysisSelect(model)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {model.icon}
                </div>
                <div>
                  <h3 className="font-medium">{model.name}</h3>
                  <p className="text-sm">{model.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-2">{model.match}%</span>
                <span className="text-sm">match</span>
                <ChevronRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button 
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
          onClick={() => setCurrentStep(1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
      </div>
    </div>
  );

  // Render step 3: Visualization selection
  const renderVisualizationSelection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended Visualizations</h2>
        <p className="text-gray-600">Select the visualizations you'd like in your dashboard</p>
        <div className="bg-blue-50 p-3 rounded-md my-3 flex items-start">
          <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-blue-700 font-medium">{selectedAnalysisModel.name} selected</p>
            <p className="text-sm text-blue-600">Visualization recommendations are based on this analysis type</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 mb-6">
        {visualizationOptions.map(vis => (
          <div 
            key={vis.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all 
              ${selectedVisualizations.some(item => item.id === vis.id) 
                ? 'border-blue-500 bg-blue-50' 
                : `border-gray-200 ${getMatchColor(vis.match)}`}`}
            onClick={() => handleVisualizationSelect(vis)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {vis.icon}
                </div>
                <div>
                  <h3 className="font-medium">{vis.name}</h3>
                  <p className="text-sm">{vis.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-2">{vis.match}%</span>
                <span className="text-sm">match</span>
                {selectedVisualizations.some(item => item.id === vis.id) && 
                  <CheckCircle className="ml-2 w-5 h-5 text-blue-500" />
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button 
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
          onClick={() => setCurrentStep(2)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => setShowPreview(true)}
          disabled={selectedVisualizations.length === 0}
        >
          Preview Dashboard <Eye className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Render dashboard preview
  const renderDashboardPreview = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Preview</h2>
          <p className="text-gray-600">Based on {selectedAnalysisModel.name} and your selected visualizations</p>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowPreview(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h3 className="font-medium text-lg mb-3">Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Records</p>
            <p className="font-bold text-xl">1,245</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Features</p>
            <p className="font-bold text-xl">8</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Time Period</p>
            <p className="font-bold text-xl">2021-2023</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Missing Values</p>
            <p className="font-bold text-xl">2.3%</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-3">Visualizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedVisualizations.map(vis => (
            <div key={vis.id} className="bg-white border rounded-lg p-4 h-64">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{vis.name}</h4>
                <div className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {vis.match}% match
                </div>
              </div>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                {vis.icon}
                <span className="ml-2 text-gray-500">Visualization preview</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-3">Key Insights</h3>
        <div className="bg-white border rounded-lg p-4">
          <ul className="space-y-2">
            {dataInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                  <Zap className="w-3 h-3 text-green-600" />
                </div>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between">
        <div className="flex">
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center mr-2"
            onClick={() => setShowPreview(false)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Edit Selections
          </button>
          <button 
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors flex items-center"
            onClick={() => setShowPreview(false)}
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Change Analysis Model
          </button>
        </div>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
          onClick={() => {
            setShowPreview(false);
            setFinalDashboard(true);
          }}
        >
          Finalize Dashboard <CheckCircle className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Render final dashboard
  const renderFinalDashboard = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <div>
            <h3 className="font-medium text-green-800">Dashboard Successfully Created!</h3>
            <p className="text-green-700 text-sm">Your analysis and visualizations are ready</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Sales Data Analysis Dashboard</h2>
        <p className="text-gray-500">Created on April 22, 2025 • {selectedAnalysisModel.name}</p>
      </div>
      
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h3 className="font-medium text-lg mb-3">Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Records</p>
            <p className="font-bold text-xl">1,245</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Features</p>
            <p className="font-bold text-xl">8</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Time Period</p>
            <p className="font-bold text-xl">2021-2023</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">Missing Values</p>
            <p className="font-bold text-xl">2.3%</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Visualizations</h3>
          <div className="text-sm text-blue-600 cursor-pointer">
            Edit Visualizations
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedVisualizations.map(vis => (
            <div key={vis.id} className="bg-white border rounded-lg p-4 h-64">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{vis.name}</h4>
              </div>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                {vis.icon}
                <span className="ml-2 text-gray-500">Visualization display</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Key Insights</h3>
          <div className="text-sm text-blue-600 cursor-pointer">
            View All Insights
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <ul className="space-y-2">
            {dataInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                  <Zap className="w-3 h-3 text-green-600" />
                </div>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => {
            setShowNavigation(true);
            setCurrentView("main");
          }}
        >
          Return to Dashboard Home
        </button>
        <div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mr-2"
            onClick={() => {
              // Simulate export functionality
              alert("Exporting dashboard results...");
            }}
          >
            Export Results
          </button>
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center inline-flex"
            onClick={() => {
              // Simulate save functionality
              alert("Dashboard saved successfully!");
            }}
          >
            <Save className="w-4 h-4 mr-1" /> Save Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  // Render main navigation
  const renderNavigation = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Home</h2>
        <p className="text-gray-600">Choose an option to continue</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div 
          className="bg-blue-50 p-6 rounded-lg border border-blue-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            setCurrentView("main");
            setCurrentStep(1);
            setShowNavigation(false);
            setFileUploaded(false);
            setProcessingComplete(false);
            setSelectedAnalysisModel(null);
            setSelectedVisualizations([]);
          }}
        >
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-lg mb-2">Start New Analysis</h3>
          <p className="text-gray-600">Upload a new CSV file and create a dashboard from scratch</p>
        </div>
        
        <div 
          className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            alert("Loading analysis template...");
          }}
        >
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <FileCheck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-lg mb-2">Use Analysis Template</h3>
          <p className="text-gray-600">Choose from pre-built templates for common analysis scenarios</p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="font-medium text-lg mb-4">Recent Dashboards</h3>
        <div className="space-y-3">
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Monthly Sales Performance</h4>
                <p className="text-gray-500 text-sm">Last modified: April 18, 2025 • Time Series Analysis</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Customer Segmentation Analysis</h4>
                <p className="text-gray-500 text-sm">Last modified: April 10, 2025 • Cluster Analysis</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="w-5 h-5" />
              </button>  
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Inventory Forecasting Model</h4>
                <p className="text-gray-500 text-sm">Last modified: April 5, 2025 • Regression Analysis</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render sidebar navigation for all screens
  const renderSidebar = () => (
    <div className="fixed left-0 top-0 h-full bg-gray-800 text-white w-64 p-5">
      <div className="mb-6">
        <h2 className="text-xl font-bold">DataInsight Pro</h2>
        <p className="text-gray-400 text-sm">Automated Analysis Tool</p>
      </div>
      
      <nav>
        <ul className="space-y-1">
          <li>
            <button 
              className={`flex items-center w-full p-3 rounded-md ${currentView === "main" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => {
                setCurrentView("main");
                setShowNavigation(true);
              }}
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard Home</span>
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center w-full p-3 rounded-md ${currentView === "analysis" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => {
                setCurrentView("analysis");
                alert("Navigating to Analysis Section...");
              }}
            >
              <Activity className="w-5 h-5 mr-3" />
              <span>Analysis Section</span>
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center w-full p-3 rounded-md ${currentView === "visualization" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => {
                setCurrentView("visualization");
                alert("Navigating to Visualization Section...");
              }}
            >
              <BarChart className="w-5 h-5 mr-3" />
              <span>Visualization Section</span>
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center w-full p-3 rounded-md ${currentView === "insights" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => {
                setCurrentView("insights");
                alert("Navigating to Insights Section...");
              }}
            >
              <Zap className="w-5 h-5 mr-3" />
              <span>Insights Section</span>
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center w-full p-3 rounded-md ${currentView === "dashboard" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => {
                setCurrentView("dashboard");
                alert("Navigating to Dashboard Section...");
              }}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Dashboard Section</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-5 left-0 w-full px-5">
        <ul className="space-y-1">
          <li>
            <button 
              className="flex items-center w-full p-3 rounded-md hover:bg-gray-700"
              onClick={() => {
                alert("Opening account settings...");
              }}
            >
              <User className="w-5 h-5 mr-3" />
              <span>Profile Settings</span>
            </button>
          </li>
          <li>
            <button 
              className="flex items-center w-full p-3 rounded-md hover:bg-gray-700"
              onClick={() => {
                alert("Logging out...");
              }}
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  // Determine which step to render
  const renderCurrentStep = () => {
    if (showNavigation) return renderNavigation();
    if (finalDashboard) return renderFinalDashboard();
    if (showPreview) return renderDashboardPreview();
    
    switch(currentStep) {
      case 1: return renderFileUpload();
      case 2: return renderAnalysisSelection();
      case 3: return renderVisualizationSelection();
      default: return renderFileUpload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && renderSidebar()}
      
      <div className={`${showNavigation ? 'ml-64' : ''} p-4 min-h-screen`}>
        <div className="flex justify-between items-center mb-6">
          {!showNavigation && !finalDashboard && !showPreview && (
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex items-center mb-4 justify-center">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === step 
                        ? 'bg-blue-600 text-white' 
                        : currentStep > step 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                    }`}>
                      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    <div className={`h-1 w-16 ${step === 3 ? 'hidden' : currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 px-2">
                <div className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Upload Data</div>
                <div className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Select Analysis</div>
                <div className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Choose Visualizations</div>
              </div>
            </div>
          )}
        </div>
        
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default DataAnalysisTool;