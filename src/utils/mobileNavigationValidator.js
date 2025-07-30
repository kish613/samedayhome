/**
 * Mobile Navigation Component Validator
 * Validates the actual mobile navigation components for performance and accessibility
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import MobileNavigationOverlay from '../components/mobile/MobileNavigationOverlay.jsx';
import HamburgerButton from '../components/mobile/HamburgerButton.jsx';
import performanceMonitor from './performanceMonitor.js';
import mobileNavigationOptimizer from './mobileNavigationOptimizer.js';

class MobileNavigationComponentValidator {
  constructor() {
    this.container = null;
    this.root = null;
    this.validationResults = {
      rendering: {},
      performance: {},
      accessibility: {},
      interactions: {},
      summary: { passed: 0, failed: 0, warnings: 0 }
    };
  }

  /**
   * Initialize test environment
   */
  async initialize() {
    // Create test container
    this.container = document.createElement('div');
    this.container.id = 'mobile-nav-test-container';
    this.container.style.position = 'fixed';
    this.container.style.top = '-9999px';
    this.container.style.left = '-9999px';
    document.body.appendChild(this.container);
    
    // Create React root
    this.root = createRoot(this.container);
    
    // Initialize optimizer
    mobileNavigationOptimizer.initialize();
    
    console.log('🔧 Test environment initialized');
  }

  /**
   * Cleanup test environment
   */
  cleanup() {
    if (this.root) {
      this.root.unmount();
    }
    
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    
    mobileNavigationOptimizer.cleanup();
    
    console.log('🧹 Test environment cleaned up');
  }

  /**
   * Run all component validations
   */
  async validateComponents() {
    console.log('🧪 Validating Mobile Navigation Components...\n');
    
    try {
      await this.initialize();
      
      // Test component rendering
      await this.validateRendering();
      
      // Test performance
      await this.validatePerformance();
      
      // Test accessibility
      await this.validateAccessibility();
      
      // Test interactions
      await this.validateInteractions();
      
      // Generate report
      this.generateReport();
      
      const success = this.validationResults.summary.failed === 0;
      return success;
      
    } catch (error) {
      console.error('❌ Component validation failed:', error);
      return false;
    } finally {
      this.cleanup();
    }
  }

  /**
   * Validate component rendering
   */
  async validateRendering() {
    console.log('🎨 Validating Component Rendering...');
    
    const rendering = this.validationResults.rendering;
    
    // Test HamburgerButton rendering
    try {
      const TestHamburgerButton = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return React.createElement(HamburgerButton, {
          isOpen,
          onClick: () => setIsOpen(!isOpen)
        });
      };
      
      this.root.render(React.createElement(TestHamburgerButton));
      
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const button = this.container.querySelector('button');
      
      rendering.hamburgerButton = {
        passed: button !== null,
        rendered: button !== null,
        hasAriaLabel: button?.hasAttribute('aria-label'),
        hasAriaExpanded: button?.hasAttribute('aria-expanded'),
        hasTouchTarget: button && (
          parseInt(getComputedStyle(button).minWidth) >= 44 &&
          parseInt(getComputedStyle(button).minHeight) >= 44
        )
      };
      
    } catch (error) {
      rendering.hamburgerButton = {
        passed: false,
        error: error.message
      };
    }
    
    // Test MobileNavigationOverlay rendering
    try {
      const TestOverlay = () => {
        return React.createElement(MobileNavigationOverlay, {
          isOpen: true,
          onClose: () => {},
          id: 'test-overlay'
        });
      };
      
      this.root.render(React.createElement(TestOverlay));
      
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const overlay = this.container.querySelector('[role="dialog"]');
      const navigation = this.container.querySelector('[role="navigation"]');
      const menuItems = this.container.querySelectorAll('[role="menuitem"]');
      
      rendering.navigationOverlay = {
        passed: overlay !== null && navigation !== null && menuItems.length === 5,
        overlayRendered: overlay !== null,
        navigationRendered: navigation !== null,
        menuItemsCount: menuItems.length,
        hasAriaModal: overlay?.getAttribute('aria-modal') === 'true',
        hasAriaLabel: overlay?.hasAttribute('aria-label')
      };
      
    } catch (error) {
      rendering.navigationOverlay = {
        passed: false,
        error: error.message
      };
    }
    
    // Update summary
    const renderingTests = Object.values(rendering);
    const passedTests = renderingTests.filter(test => test.passed).length;
    const failedTests = renderingTests.length - passedTests;
    
    this.validationResults.summary.passed += passedTests;
    this.validationResults.summary.failed += failedTests;
    
    console.log(`   ✅ ${passedTests} passed, ❌ ${failedTests} failed`);
  }

  /**
   * Validate performance characteristics
   */
  async validatePerformance() {
    console.log('⚡ Validating Performance...');
    
    const performance = this.validationResults.performance;
    
    // Test render performance
    const renderStartTime = performanceMonitor.getPerformanceSummary()?.navigation?.domInteractive || 0;
    
    performance.renderPerformance = {
      passed: renderStartTime < 1000, // Should render within 1 second
      renderTime: renderStartTime,
      threshold: 1000
    };
    
    // Test animation performance
    try {
      performanceMonitor.startMeasurement('animation-test');
      
      // Simulate animation
      const testElement = document.createElement('div');
      testElement.style.transform = 'translateX(100px)';
      testElement.style.transition = 'transform 300ms ease-in-out';
      this.container.appendChild(testElement);
      
      await new Promise(resolve => setTimeout(resolve, 350));
      
      const animationResult = performanceMonitor.endMeasurement('animation-test');
      
      performance.animationPerformance = {
        passed: animationResult.duration < 400,
        duration: animationResult.duration,
        threshold: 400
      };
      
    } catch (error) {
      performance.animationPerformance = {
        passed: false,
        error: error.message
      };
    }
    
    // Test memory usage
    const initialMemory = performanceMonitor.getMemoryUsage();
    
    // Create and destroy components multiple times
    for (let i = 0; i < 10; i++) {
      const TestComponent = () => React.createElement(HamburgerButton, {
        isOpen: false,
        onClick: () => {}
      });
      
      this.root.render(React.createElement(TestComponent));
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    const finalMemory = performanceMonitor.getMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    performance.memoryUsage = {
      passed: memoryIncrease < 1024 * 1024, // Less than 1MB increase
      increase: memoryIncrease,
      threshold: 1024 * 1024
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
   * Validate accessibility features
   */
  async validateAccessibility() {
    console.log('♿ Validating Accessibility...');
    
    const accessibility = this.validationResults.accessibility;
    
    // Render components for accessibility testing
    const TestApp = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      
      return React.createElement('div', null, [
        React.createElement(HamburgerButton, {
          key: 'button',
          isOpen,
          onClick: () => setIsOpen(!isOpen)
        }),
        React.createElement(MobileNavigationOverlay, {
          key: 'overlay',
          isOpen,
          onClose: () => setIsOpen(false),
          id: 'test-overlay'
        })
      ]);
    };
    
    this.root.render(React.createElement(TestApp));
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Test ARIA attributes
    const button = this.container.querySelector('button');
    const ariaAttributes = {
      hasAriaLabel: button?.hasAttribute('aria-label'),
      hasAriaExpanded: button?.hasAttribute('aria-expanded'),
      hasAriaControls: button?.hasAttribute('aria-controls'),
      hasAriaHaspopup: button?.hasAttribute('aria-haspopup')
    };
    
    accessibility.ariaAttributes = {
      passed: Object.values(ariaAttributes).every(Boolean),
      ...ariaAttributes
    };
    
    // Test keyboard navigation
    const focusableElements = this.container.querySelectorAll(
      'button, [role="menuitem"], a[href]'
    );
    
    accessibility.keyboardNavigation = {
      passed: focusableElements.length > 0,
      focusableElementsCount: focusableElements.length,
      allHaveTabIndex: Array.from(focusableElements).every(el => 
        el.hasAttribute('tabindex') || el.tagName === 'BUTTON' || el.tagName === 'A'
      )
    };
    
    // Test touch targets
    const touchTargets = this.container.querySelectorAll('button, [role="menuitem"]');
    const validTouchTargets = Array.from(touchTargets).filter(el => {
      const styles = getComputedStyle(el);
      return parseInt(styles.minWidth) >= 44 && parseInt(styles.minHeight) >= 44;
    });
    
    accessibility.touchTargets = {
      passed: validTouchTargets.length === touchTargets.length,
      totalTargets: touchTargets.length,
      validTargets: validTouchTargets.length
    };
    
    // Test semantic markup
    const dialog = this.container.querySelector('[role="dialog"]');
    const navigation = this.container.querySelector('[role="navigation"]');
    const menuItems = this.container.querySelectorAll('[role="menuitem"]');
    
    accessibility.semanticMarkup = {
      passed: dialog && navigation && menuItems.length === 5,
      hasDialog: !!dialog,
      hasNavigation: !!navigation,
      menuItemsCount: menuItems.length
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
   * Validate user interactions
   */
  async validateInteractions() {
    console.log('👆 Validating Interactions...');
    
    const interactions = this.validationResults.interactions;
    
    // Test click interactions
    let clickHandled = false;
    
    const TestClickComponent = () => {
      return React.createElement(HamburgerButton, {
        isOpen: false,
        onClick: () => { clickHandled = true; }
      });
    };
    
    this.root.render(React.createElement(TestClickComponent));
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const button = this.container.querySelector('button');
    if (button) {
      button.click();
    }
    
    interactions.clickHandling = {
      passed: clickHandled,
      buttonFound: !!button,
      clickHandled
    };
    
    // Test state changes
    let stateChanged = false;
    
    const TestStateComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      
      React.useEffect(() => {
        if (isOpen) {
          stateChanged = true;
        }
      }, [isOpen]);
      
      return React.createElement(HamburgerButton, {
        isOpen,
        onClick: () => setIsOpen(true)
      });
    };
    
    this.root.render(React.createElement(TestStateComponent));
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const stateButton = this.container.querySelector('button');
    if (stateButton) {
      stateButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    interactions.stateManagement = {
      passed: stateChanged,
      stateChanged
    };
    
    // Test focus management
    let focusManaged = false;
    
    const TestFocusComponent = () => {
      const buttonRef = React.useRef();
      
      React.useEffect(() => {
        if (buttonRef.current) {
          buttonRef.current.focus();
          focusManaged = document.activeElement === buttonRef.current;
        }
      }, []);
      
      return React.createElement(HamburgerButton, {
        ref: buttonRef,
        isOpen: false,
        onClick: () => {}
      });
    };
    
    this.root.render(React.createElement(TestFocusComponent));
    await new Promise(resolve => setTimeout(resolve, 100));
    
    interactions.focusManagement = {
      passed: focusManaged,
      focusManaged
    };
    
    // Update summary
    const interactionTests = Object.values(interactions);
    const passedTests = interactionTests.filter(test => test.passed).length;
    const failedTests = interactionTests.length - passedTests;
    
    this.validationResults.summary.passed += passedTests;
    this.validationResults.summary.failed += failedTests;
    
    console.log(`   ✅ ${passedTests} passed, ❌ ${failedTests} failed`);
  }

  /**
   * Generate comprehensive validation report
   */
  generateReport() {
    console.log('\n📋 Mobile Navigation Component Validation Report');
    console.log('================================================\n');
    
    // Rendering Report
    console.log('🎨 Component Rendering:');
    const rendering = this.validationResults.rendering;
    
    if (rendering.hamburgerButton) {
      console.log(`   Hamburger Button: ${rendering.hamburgerButton.passed ? '✅' : '❌'}`);
      console.log(`     Rendered: ${rendering.hamburgerButton.rendered ? 'Yes' : 'No'}`);
      console.log(`     ARIA Label: ${rendering.hamburgerButton.hasAriaLabel ? 'Yes' : 'No'}`);
      console.log(`     Touch Target: ${rendering.hamburgerButton.hasTouchTarget ? 'Yes' : 'No'}`);
    }
    
    if (rendering.navigationOverlay) {
      console.log(`   Navigation Overlay: ${rendering.navigationOverlay.passed ? '✅' : '❌'}`);
      console.log(`     Dialog Rendered: ${rendering.navigationOverlay.overlayRendered ? 'Yes' : 'No'}`);
      console.log(`     Navigation Rendered: ${rendering.navigationOverlay.navigationRendered ? 'Yes' : 'No'}`);
      console.log(`     Menu Items: ${rendering.navigationOverlay.menuItemsCount}/5`);
    }
    
    // Performance Report
    console.log('\n⚡ Performance:');
    const performance = this.validationResults.performance;
    
    if (performance.renderPerformance) {
      console.log(`   Render Performance: ${performance.renderPerformance.passed ? '✅' : '❌'}`);
      console.log(`     Render Time: ${performance.renderPerformance.renderTime}ms`);
    }
    
    if (performance.animationPerformance) {
      console.log(`   Animation Performance: ${performance.animationPerformance.passed ? '✅' : '❌'}`);
      console.log(`     Duration: ${performance.animationPerformance.duration?.toFixed(2)}ms`);
    }
    
    if (performance.memoryUsage) {
      console.log(`   Memory Usage: ${performance.memoryUsage.passed ? '✅' : '❌'}`);
      console.log(`     Increase: ${(performance.memoryUsage.increase / 1024).toFixed(2)}KB`);
    }
    
    // Accessibility Report
    console.log('\n♿ Accessibility:');
    const accessibility = this.validationResults.accessibility;
    
    if (accessibility.ariaAttributes) {
      console.log(`   ARIA Attributes: ${accessibility.ariaAttributes.passed ? '✅' : '❌'}`);
    }
    
    if (accessibility.keyboardNavigation) {
      console.log(`   Keyboard Navigation: ${accessibility.keyboardNavigation.passed ? '✅' : '❌'}`);
      console.log(`     Focusable Elements: ${accessibility.keyboardNavigation.focusableElementsCount}`);
    }
    
    if (accessibility.touchTargets) {
      console.log(`   Touch Targets: ${accessibility.touchTargets.passed ? '✅' : '❌'}`);
      console.log(`     Valid Targets: ${accessibility.touchTargets.validTargets}/${accessibility.touchTargets.totalTargets}`);
    }
    
    // Interactions Report
    console.log('\n👆 Interactions:');
    const interactions = this.validationResults.interactions;
    
    if (interactions.clickHandling) {
      console.log(`   Click Handling: ${interactions.clickHandling.passed ? '✅' : '❌'}`);
    }
    
    if (interactions.stateManagement) {
      console.log(`   State Management: ${interactions.stateManagement.passed ? '✅' : '❌'}`);
    }
    
    if (interactions.focusManagement) {
      console.log(`   Focus Management: ${interactions.focusManagement.passed ? '✅' : '❌'}`);
    }
    
    // Summary
    const summary = this.validationResults.summary;
    console.log('\n📊 Validation Summary:');
    console.log(`   Total Tests: ${summary.passed + summary.failed}`);
    console.log(`   Passed: ${summary.passed}`);
    console.log(`   Failed: ${summary.failed}`);
    console.log(`   Success Rate: ${((summary.passed / (summary.passed + summary.failed)) * 100).toFixed(1)}%`);
    
    const overallStatus = summary.failed === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED';
    console.log(`   Overall Status: ${overallStatus}`);
  }

  /**
   * Get validation results
   */
  getResults() {
    return this.validationResults;
  }
}

export default MobileNavigationComponentValidator;