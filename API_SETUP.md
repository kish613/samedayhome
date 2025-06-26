# API Integration Setup Guide

## Overview

This application now integrates with:
- **PropertyData UK API** - For property valuations and market comparables
- **OpenAI O3 API** - For intelligent offer calculations (10-15% below market value)

## Required API Keys

### 1. PropertyData API
- Visit: https://propertydata.co.uk/api
- Sign up for an account
- Choose a plan (14-day free trial available)
- Cost: Starting from £28/month
- Get your API key from the dashboard

### 2. OpenAI API
- Visit: https://platform.openai.com/
- Create an account and add billing
- Generate an API key
- Cost: $2 per 1M input tokens, $8 per 1M output tokens (O3-mini)

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your API keys to `.env`:
   ```
   REACT_APP_PROPERTYDATA_API_KEY=your_propertydata_api_key_here
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_ENV=development
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

## How It Works

### 1. Property Valuation Flow
1. User submits property details via form
2. App calls PropertyData API with postcode to get:
   - Market valuation data
   - Comparable sales in the area
3. OpenAI O3 analyzes the data and calculates:
   - Accurate market value estimate
   - Cash offer (10-15% below market value)
   - Risk assessment and reasoning

### 2. Fallback System
If APIs are unavailable, the system provides:
- Basic valuation estimate based on property type/bedrooms/condition
- Default 13% discount for cash offer
- Clear indication that it's an estimate

### 3. Offer Calculation Logic
- **Excellent condition**: 10-12% discount
- **Good condition**: 12-13% discount  
- **Fair condition**: 13-14% discount
- **Requires work**: 14-15% discount

## API Endpoints Used

### PropertyData API
- `/valuation-sale` - Property valuation data
- `/sold-prices` - Comparable sales data

### OpenAI API
- `/chat/completions` - O3-mini model for analysis
- Function calling for structured offer calculation

## Testing

### With API Keys
1. Set up environment variables
2. Submit a property form with valid UK postcode
3. Observe real-time valuation and offer calculation

### Without API Keys (Fallback Mode)
1. Leave API keys empty or invalid
2. System will use fallback calculation
3. User sees estimated offer with appropriate disclaimers

## Security Notes

- API keys are kept in environment variables
- Keys are not exposed in client-side code
- CORS is handled by PropertyData API
- All API calls include proper error handling

## Production Deployment

For production deployment:
1. Set environment variables in your hosting platform
2. Ensure API key billing limits are appropriate
3. Monitor API usage and costs
4. Consider implementing rate limiting for high traffic

## Support

If you need help setting up the APIs:
- PropertyData: https://propertydata.co.uk/contact
- OpenAI: https://help.openai.com/

For technical issues, check the browser console for error messages.