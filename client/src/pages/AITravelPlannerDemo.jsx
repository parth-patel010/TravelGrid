import React, { useState } from "react";
import {
    Brain,
    Zap,
    Route,
    DollarSign,
    TrendingUp,
    ArrowLeft,
    Home,
    Settings,
    BarChart3,
    MessageSquare,
    Mic,
    Lightbulb
} from "lucide-react";
import AITravelPlannerComponent from "../components/TravelPlanGenerator/AITravelPlanner";
import AIIteraryBuilder from "../components/TravelPlanGenerator/AIIteraryBuilder";
import AIRecommendationEngine from "../components/TravelPlanGenerator/AIRecommendationEngine";
import PredictiveAnalytics from "../components/TravelPlanGenerator/PredictiveAnalytics";
import AIPlanningInterface from "../components/TravelPlanGenerator/AIPlanningInterface";

const AITravelPlannerDemo = () => {
    const [activeTab, setActiveTab] = useState('main');
    const [demoData, setDemoData] = useState({
        destination: "Paris",
        duration: 5,
        budget: 2500,
        interests: ["culture", "food", "art"],
        travelStyle: "balanced",
        groupSize: 2
    });

    const tabs = [
        { id: 'main', label: 'Main Planner', icon: Brain },
        { id: 'itinerary', label: 'AI Itinerary Builder', icon: Route },
        { id: 'recommendations', label: 'AI Recommendations', icon: Lightbulb },
        { id: 'analytics', label: 'Predictive Analytics', icon: BarChart3 },
        { id: 'interface', label: 'AI Interface', icon: MessageSquare }
    ];

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'main':
                return <AITravelPlannerComponent />;
            case 'itinerary':
                return (
                    <AIIteraryBuilder
                        itinerary={[
                            {
                                day: 1,
                                activities: [
                                    { id: 1, name: "Eiffel Tower Visit", duration: "2 hours", location: "Champ de Mars", type: "culture" },
                                    { id: 2, name: "Louvre Museum", duration: "3 hours", location: "Rue de Rivoli", type: "culture" },
                                    { id: 3, name: "Seine River Cruise", duration: "1 hour", location: "Port de la Bourdonnais", type: "nature" }
                                ],
                                timing: "9:00 AM - 6:00 PM",
                                energyLevel: "High",
                                flexibility: "Medium"
                            },
                            {
                                day: 2,
                                activities: [
                                    { id: 4, name: "Notre-Dame Cathedral", duration: "1.5 hours", location: "Île de la Cité", type: "culture" },
                                    { id: 5, name: "Latin Quarter Walk", duration: "2 hours", location: "5th Arrondissement", type: "culture" },
                                    { id: 6, name: "Local Food Market", duration: "1 hour", location: "Rue Mouffetard", type: "food" }
                                ],
                                timing: "10:00 AM - 5:00 PM",
                                energyLevel: "Medium",
                                flexibility: "High"
                            }
                        ]}
                        onItineraryChange={(newItinerary) => console.log("Itinerary updated:", newItinerary)}
                        destination={demoData.destination}
                        interests={demoData.interests}
                        travelStyle={demoData.travelStyle}
                    />
                );
            case 'recommendations':
                return (
                    <AIRecommendationEngine
                        destination={demoData.destination}
                        interests={demoData.interests}
                        travelStyle={demoData.travelStyle}
                        budget={demoData.budget}
                        groupSize={demoData.groupSize}
                        onRecommendationSelect={(item, category) => console.log("Selected:", item, category)}
                    />
                );
            case 'analytics':
                return (
                    <PredictiveAnalytics
                        destination={demoData.destination}
                        travelDates={["2024-06-15", "2024-06-20"]}
                        interests={demoData.interests}
                        budget={demoData.budget}
                    />
                );
            case 'interface':
                return (
                    <AIPlanningInterface
                        destination={demoData.destination}
                        interests={demoData.interests}
                        onCommandProcessed={(command, response) => console.log("Command processed:", command, response)}
                    />
                );
            default:
                return <AITravelPlannerComponent />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Header */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => window.history.back()}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <Brain className="w-8 h-8 text-purple-400" />
                                <div>
                                    <h1 className="text-2xl font-bold">AI Travel Planner Demo</h1>
                                    <p className="text-sm text-gray-400">Experience the future of travel planning</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                title="Go Home"
                            >
                                <Home className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setActiveTab('main')}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                title="Reset to Main"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Info */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-b border-blue-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Destination</div>
                                <div className="font-semibold text-blue-300">{demoData.destination}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Duration</div>
                                <div className="font-semibold text-green-300">{demoData.duration} days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Budget</div>
                                <div className="font-semibold text-yellow-300">${demoData.budget.toLocaleString()}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Interests</div>
                                <div className="font-semibold text-purple-300">{demoData.interests.join(', ')}</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-400">AI Version</div>
                            <div className="font-semibold text-purple-300">2.0.1</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {renderActiveTab()}
            </div>

            {/* Footer */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700 mt-16">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            <Brain className="w-5 h-5 text-purple-400" />
                            <span className="text-lg font-semibold">AI Travel Planner</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Advanced AI-powered travel planning with intelligent recommendations, predictive analytics, and natural language interface.
                        </p>
                        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500">
                            <span>Machine Learning</span>
                            <span>•</span>
                            <span>Predictive Analytics</span>
                            <span>•</span>
                            <span>Voice Commands</span>
                            <span>•</span>
                            <span>Real-time Optimization</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AITravelPlannerDemo;
