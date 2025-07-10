import React from 'react'
import { motion } from 'framer-motion'

const AnimatedMedal = ({ className = '' }) => {
  const medalStyle = {
    medalContainer: {
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      animation: 'float 3s ease-in-out infinite',
    },
    medalRibbon: {
      width: '24px',
      height: '36px',
      position: 'relative',
      margin: '0 auto 4px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    ribbonLeft: {
      position: 'absolute',
      left: 0,
      width: '8px',
      height: '36px',
      background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 50%, #e55a2b 100%)',
      transformOrigin: 'top center',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 85%)',
      boxShadow: `
        inset 1px 0 2px rgba(255, 255, 255, 0.3),
        inset -1px 0 2px rgba(0, 0, 0, 0.2),
        1px 1px 3px rgba(0, 0, 0, 0.3)
      `,
    },
    ribbonRight: {
      position: 'absolute',
      right: 0,
      width: '8px',
      height: '36px',
      background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 50%, #e55a2b 100%)',
      transformOrigin: 'top center',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 15% 100%)',
      boxShadow: `
        inset 1px 0 2px rgba(255, 255, 255, 0.3),
        inset -1px 0 2px rgba(0, 0, 0, 0.2),
        1px 1px 3px rgba(0, 0, 0, 0.3)
      `,
    },
    ribbonCenter: {
      position: 'absolute',
      left: '50%',
      top: 0,
      transform: 'translateX(-50%)',
      width: '8px',
      height: '36px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 50%, #1e40af 100%)',
      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: `
        inset 1px 0 2px rgba(255, 255, 255, 0.3),
        inset -1px 0 2px rgba(0, 0, 0, 0.2),
        1px 1px 3px rgba(0, 0, 0, 0.3)
      `,
    },
    medal: {
      width: '20px',
      height: '20px',
      position: 'relative',
      margin: '0 auto',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    medalOuter: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'conic-gradient(from 0deg, #ffd700, #ffed4e, #ffd700, #ffb700, #ffd700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `
        0 2px 6px rgba(0, 0, 0, 0.4),
        inset 0 1px 3px rgba(255, 255, 255, 0.6),
        inset 0 -1px 3px rgba(0, 0, 0, 0.2)
      `,
    },
    medalInner: {
      position: 'relative',
      zIndex: 2,
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: `
        radial-gradient(ellipse at 30% 30%, #60a5fa, #3b82f6),
        radial-gradient(ellipse at 70% 70%, #1e40af, #1e3a8a)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `
        inset 0 1px 3px rgba(0, 0, 0, 0.4),
        inset 0 -1px 1px rgba(255, 255, 255, 0.2)
      `,
    },
    star: {
      width: '5px',
      height: '5px',
      position: 'relative',
      marginBottom: '1px',
    },
    laurel: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    laurelLeft: {
      position: 'absolute',
      left: '2px',
      width: '5px',
      height: '1px',
      background: 'linear-gradient(90deg, #ffed4e, #ffd700, #ffb700)',
      top: '50%',
      borderRadius: '2px',
      transform: 'translateY(-50%) rotate(-25deg)',
      boxShadow: `
        0 -1px 0 #ffd700,
        0 -2px 0 #ffd700,
        0 -3px 0 #ffd700
      `,
    },
    laurelRight: {
      position: 'absolute',
      right: '2px',
      width: '5px',
      height: '1px',
      background: 'linear-gradient(90deg, #ffed4e, #ffd700, #ffb700)',
      top: '50%',
      borderRadius: '2px',
      transform: 'translateY(-50%) rotate(25deg)',
      boxShadow: `
        0 -1px 0 #ffd700,
        0 -2px 0 #ffd700,
        0 -3px 0 #ffd700
      `,
    },
  }

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={medalStyle.medalContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: [0, -1, 0],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        
        @keyframes starGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.6)); }
        }
        
        @keyframes shine {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .medal-outer::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 50%, #1e40af 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.3),
            inset 0 -1px 2px rgba(0, 0, 0, 0.4);
        }
        
        .medal-outer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shine 4s linear infinite;
        }
        
        .star::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ffed4e, #ffd700, #ffb700);
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4));
        }
        
        .medal-container:hover .star::before {
          animation: starGlow 0.6s ease-in-out;
        }
      `}</style>
      
      <motion.div
        style={medalStyle.medalRibbon}
        animate={{
          y: isHovered ? 3 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          style={medalStyle.ribbonLeft}
          animate={{
            rotate: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          style={medalStyle.ribbonCenter}
          animate={{
            y: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          style={medalStyle.ribbonRight}
          animate={{
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
      
      <motion.div
        style={medalStyle.medal}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div 
          className="medal-outer"
          style={{
            ...medalStyle.medalOuter,
            boxShadow: isHovered ? `
              0 4px 8px rgba(0, 0, 0, 0.5),
              inset 0 1px 3px rgba(255, 255, 255, 0.6),
              inset 0 -1px 3px rgba(0, 0, 0, 0.2)
            ` : medalStyle.medalOuter.boxShadow
          }}
        >
          <div style={medalStyle.medalInner}>
            <div className="star" style={medalStyle.star} />
            <div style={medalStyle.laurel}>
              <div style={medalStyle.laurelLeft} />
              <div style={medalStyle.laurelRight} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedMedal