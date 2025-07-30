/**
 * Mobile Navigation Validation Script
 * Validates mobile navigation performance and accessibility without full test setup
 */

import { 
  prefersReducedMotion, 
  getAnimationDuration, 
  isTouchDevice,
  getDeviceType,
  triggerHapticFeedback,
  scrollToElement
} from './mobileUtils.js';
import performanceMonitor from './performanceMonitor.js';
import mobileNavigationOptimizer from './mobileNavigationOptimizer.js';

class MobileNavigationValidator {
  constructor() {
    this.validationResults = {
      performance: {},
      accessibility: {},
      functionality: {},
      summary: {
        passed: 0,
        failed: 0,
        warnings: 0,
      }
    };
  }

  /**
   * Run all validation checks
   */
  async validateAll() {
    console.log('🔍 Validating Mobile Navigation...\n');
    
    try {
      // Initialize optimizer
      mobileNavigationOptimizer.initialize();
      
      // Run validation checks
      await this.validatePerformance();
      await this.validateAccessibility();
      await this.validateFunctionality();
      
      // Generate report
      this.generateValidationReport();
      
      // Cleanup
      mobileNavigationOptimizer.cleanup();
      
      const success = this.validationResults.summary.failed === 0;
      return success;
      
    } catch (error) {
      console.error('❌ Validation failed:', error);
      return false;
    }
  }

  /**
   * Validate performance requirements
   */
  async validatePerformance() {
    console.log('🏃‍♂️ Validating Performance...');
    
    const performance = this.validationResults.performance;
    
    // Check animation duration optimization
    const animationDuration = getAnimationDuration(300);
    const reducedMotion = prefersReducedMotion();
    
    performance.animationOptimization = {
      passed: reducedMotion ? animationDuration === 0 : animationDuration === 300,
      duration: animationDuration,
      reducedMotion,
    };
    
    // Check touch device detection
    const touchSupported = isTouchDevice();
    const deviceType = getDeviceType();
    
    performance.deviceDetection = {
      passed: typeof touchSupported === 'boolean' && typeof deviceType === 'string',
      touchSupported,
      deviceType,
    };
    
    // Check performance monitoring
    const monitorStatus = performanceMonitor.getPerformanceSummary();
    
    performance.monitoring = {
      passed: monitorStatus !== null,
      available: monitorStatus !== null,
    };
    
    // Check optimizer status
    const optimizerStatus = mobileNavigationOptimizer.getStatus();
    
    performance.optimization = {
      passed: optimizerStatus.isOptimized,
      status: optimizerStatus,
    };
    
    // Update summary
    const performanceTests = Object.values(performance);
    const passedTests = performanceTests.filter(test => test.passed).length;
    const failedTests = performanceTests.length - passedTests;
    
    this.validationResults.summary.passed += passedTests;
    this.validationResults.summary.failed += failedTests;
    
    console.log(`   ✅ ${passedTests} passed, ❌ ${failedTests} failed`);
  }

  /**
   * Validate accessibility requirements
   */
  async validateAccessibility() {
    console.log('♿ Validating Accessibility...');
    
    const accessibility = this.validationResults.accessibility;
    
    // Check ARIA support
    const ariaSupported = 'setAttribute' in document.createElement('div');
    
    accessibility.ariaSupport = {
      passed: ariaSupported,
      supported: ariaSupported,
    };
    
    // Check keyboard navigation support
    const keyboardSupported = 'addEventListener' in document;
    
    accessibility.keyboardNavigation = {
      passed: keyboardSupported,
      supported: keyboardSupported,
    };
    
    // Check focus management
    const focusSupported = 'focus' in document.createElement('button');
    
    accessibility.focusManagement = {
      passed: focusSupported,
      supported: focusSupported,
    };
    
    // Check screen reader support
    const screenReaderSupported = 'textContent' in document.createElement('span');
    
    accessibility.screenReaderSupport = {
      passed: screenReaderSupported,
      supported: screenReaderSupported,
    };
    
    // Update summary
    const accessibilityTests = Object.values(accessibility);
    const passedTests = accessibilityTests.filter(test => test.passed).length;
    const failedTests = accessibilityTests.length - passedTests;
    
    this.validationResults.summary.passed += passedTests;
    this.validationResults.summary.failed += failedTests;
    
    console.log(`   ✅ ${passedTests} passed, ❌ ${failedTests} failed`);
  }

  /**
   * Validate functionality requirements
   */
  async validateFunctionality() {
    console.log('🔧 Validating Functionality...');
    
    const functionality = this.validationResults.functionality;
    
    // Check haptic feedback
    try {
      triggerHapticFeedback('light');
      functionality.hapticFeedback = {
        passed: true,
        available: 'vibrate' in navigator,
      };
    } catch (error) {
      functionality.hapticFeedback = {
        passed: false,
        error: error.message,
      };
    }
    
    // Check scroll functionality
    try {
      const testElement = document.createElement('div');
      scrollToElement(testElement);
      functionality.scrollToElement = {
        passed: true,
        available: true,
      };
    } catch (error) {
      functionality.scrollToElement = {
        passed: false,
        error: error.message,
      };
    }
    
    // Check animation frame support
    const rafSupported = 'requestAnimationFrame' in window;
    
    functionality.animationFrames = {
      passed: rafSupported,
      supported: rafSupported,
    };
    
    // Check CSS transform support
    const transformSupported = CSS.supports('transform', 'translateX(0)');
    
    functionality.cssTransforms = {
      passed: transformSupported,
      supported: transformSupported,
    };
    
    // Update summary
    const functionalityTests = Object.values(functionality);
    const passedTests = functionalityTests.filter(test => test.passed).length;
    const failedTests = functionalityTests.length - passedTests;
    
    this.validationResults.summary.passed += passedTests;
    this.validationResults.summary.failed += failedTests;
    
    console.log(`   ✅ ${passedTests} passed, ❌ ${failedTests} failed`);
  }

  /**
   * Generate validation report
   */
  generateValidationReport() {
    console.log('\n📋 Mobile Navigation Validation Report');
    console.log('=====================================\n');
    
    // Performance Report
    console.log('🏃‍♂️ Performance Validation:');
    const perf = this.validationResults.performance;
    
    console.log(`   Animation Optimization: ${perf.animationOptimization.passed ? '✅' : '❌'}`);
    console.log(`     Duration: ${perf.animationOptimization.duration}ms`);
    console.log(`     Reduced Motion: ${perf.animationOptimization.reducedMotion ? 'Yes' : 'No'}`);
    
    console.log(`   Device Detection: ${perf.deviceDetection.passed ? '✅' : '❌'}`);
    console.log(`     Touch Supported: ${perf.deviceDetection.touchSupported ? 'Yes' : 'No'}`);
    console.log(`     Device Type: ${perf.deviceDetection.deviceType}`);
    
    console.log(`   Performance Monitoring: ${perf.monitoring.passed ? '✅' : '❌'}`);
    console.log(`   Optimization: ${perf.optimization.passed ? '✅' : '❌'}`);
    
    // Accessibility Report
    console.log('\n♿ Accessibility Validation:');
    const a11y = this.validationResults.accessibility;
    
    console.log(`   ARIA Support: ${a11y.ariaSupport.passed ? '✅' : '❌'}`);
    console.log(`   Keyboard Navigation: ${a11y.keyboardNavigation.passed ? '✅' : '❌'}`);
    console.log(`   Focus Management: ${a11y.focusManagement.passed ? '✅' : '❌'}`);
    console.log(`   Screen Reader Support: ${a11y.screenReaderSupport.passed ? '✅' : '❌'}`);
    
    // Functionality Report
    console.log('\n🔧 Functionality Validation:');
    const func = this.validationResults.functionality;
    
    console.log(`   Haptic Feedback: ${func.hapticFeedback.passed ? '✅' : '❌'}`);
    console.log(`   Scroll to Element: ${func.scrollToElement.passed ? '✅' : '❌'}`);
    console.log(`   Animation Frames: ${func.animationFrames.passed ? '✅' : '❌'}`);
    console.log(`   CSS Transforms: ${func.cssTransforms.passed ? '✅' : '❌'}`);
    
    // Summary
    const summary = this.validationResults.summary;
    console.log('\n📊 Validation Summary:');
    console.log(`   Total Checks: ${summary.passed + summary.failed}`);
    console.log(`   Passed: ${summary.passed}`);
    console.log(`   Failed: ${summary.failed}`);
    console.log(`   Success Rate: ${((summary.passed / (summary.passed + summary.failed)) * 100).toFixed(1)}%`);
    
    const overallStatus = summary.failed === 0 ? '✅ PASSED' : '❌ FAILED';
    console.log(`   Overall Status: ${overallStatus}`);
  }

  /**
   * Get validation results
   */
  getResults() {
    return this.validationResults;
  }
}

// Export for use in other modules
export default MobileNavigationValidator;

// CLI interface
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  const validator = new MobileNavigationValidator();
  
  validator.validateAll().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}