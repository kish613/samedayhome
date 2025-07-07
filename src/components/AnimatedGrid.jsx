import React from 'react';

const AnimatedGrid = ({ className = "" }) => {
  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundImage: `
      linear-gradient(rgba(59, 130, 246, 0.2) 2px, transparent 2px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.2) 2px, transparent 2px)
    `,
    backgroundSize: '60px 60px',
    zIndex: 1
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <div style={containerStyle}>
        {/* Visible grid pattern with CSS-in-JS */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
          animation: 'gridMove 20s linear infinite'
        }} />
        
        {/* Animated overlay lines */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
          animation: 'slideRight 3s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '60%',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)',
          animation: 'slideRight 4s ease-in-out infinite 1s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: '30%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent, #3b82f6, transparent)',
          animation: 'slideDown 3s ease-in-out infinite 0.5s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: '70%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent, #60a5fa, transparent)',
          animation: 'slideDown 4s ease-in-out infinite 1.5s'
        }} />
      </div>
      
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes slideRight {
          0%, 100% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 0.8; }
        }
        
        @keyframes slideDown {
          0%, 100% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedGrid;
