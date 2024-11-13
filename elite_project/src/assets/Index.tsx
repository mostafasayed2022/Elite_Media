import React, { useEffect, useState } from 'react';
import App from '../App';

// Define the type for the response from the API
type FrontendControlResponse = {
    is_feature_enabled: boolean;
};

const Index: React.FC = () => {
    const [isFeatureEnabled, setIsFeatureEnabled] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        let isMounted = true; 
        const fetchFeatureControl = async () => {
            try {
                const response = await fetch('https://mhdgamer.pythonanywhere.com/api/frontend-control/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: FrontendControlResponse = await response.json();
                if (isMounted) {
                    setIsFeatureEnabled(data?.is_feature_enabled);
                }
            } catch (error) {
                console.error('Error fetching feature control:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchFeatureControl();
        return () => {
            isMounted = false;
        };
    });

    // If still loading, display a loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the feature is disabled, show a "blocked" page or message
    if (!isFeatureEnabled) {
        return <div>Access to this page is currently blocked.</div>;
    }

    // If the feature is enabled, render the main application
    return <App />;
};


export default Index