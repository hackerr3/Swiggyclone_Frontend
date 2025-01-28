
import './styles/landing-page.css'; // Import the CSS file for styling

import React from 'react';
import WelcomeSection from '../components/WelcomeSection'; // Importing the WelcomeSection component

const LandingPage = () => {
  return (
    <div className="landing-page">
      <WelcomeSection />
    </div>
  );
};

export default LandingPage;
