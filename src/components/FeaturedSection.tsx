import React from 'react';
import FullScreenCarShowcase from './FullScreenCarShowcase';

interface FeaturedSectionProps {
  onComplete?: () => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onComplete }) => {
  return <FullScreenCarShowcase onComplete={onComplete} />;
};

export default FeaturedSection;
