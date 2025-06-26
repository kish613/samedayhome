# 🚀 Vercel Backend Setup - Secure API Implementation

## Why Use Vercel API Routes?

**Security**: API keys stay on the server (not exposed in frontend bundle)
**Scalability**: Better rate limiting and error handling
**Professional**: Industry standard for production applications

## Implementation Steps

### 1. Create Vercel API Routes

Create the following files in your project:

#### `/api/property-valuation.js`
```javascript
// Vercel API route for property valuation
import { PropertyValuationService } from '../../src/services/propertyValuation.js'

// Environment variables (server-side only)
const PROPERTYDATA_API_KEY = process.env.PROPERTYDATA_API_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { formData } = req.body

    if (!formData || !formData.postcode) {
      return res.status(400).json({ error: 'Property data required' })
    }

    // Validate API keys
    if (!PROPERTYDATA_API_KEY || !OPENAI_API_KEY) {
      return res.status(500).json({ error: 'API keys not configured' })
    }

    // Create service instance with server-side API keys
    const valuationService = new PropertyValuationService()
    
    // Process the property offer
    const result = await valuationService.processPropertyOffer(formData)

    res.status(200).json(result)

  } catch (error) {
    console.error('API route error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
}
```

#### `/api/enhanced-data.js` (Optional - for enhanced accuracy factors)
```javascript
// Vercel API route for enhanced data gathering
import { enhancedDataService } from '../../src/services/enhancedDataServices.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { propertyData } = req.body

    if (!propertyData || !propertyData.postcode) {
      return res.status(400).json({ error: 'Property data required' })
    }

    // Gather enhanced data
    const enhancedData = await enhancedDataService.gatherComprehensiveData(propertyData)
    const compositeImpact = enhancedDataService.calculateCompositeImpact(enhancedData)

    res.status(200).json({
      success: true,
      enhancedData,
      compositeImpact
    })

  } catch (error) {
    console.error('Enhanced data API error:', error)
    res.status(500).json({ 
      error: 'Enhanced data unavailable',
      message: error.message 
    })
  }
}
```

### 2. Update Frontend Service

Create `/src/services/apiClient.js`:
```javascript
// Frontend API client for Vercel backend
export class ApiClient {
  
  constructor() {
    // Use relative URLs for Vercel deployment
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-app.vercel.app/api'
      : '/api'
  }

  async processPropertyOffer(formData) {
    try {
      const response = await fetch(`${this.baseUrl}/property-valuation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()

    } catch (error) {
      console.error('API client error:', error)
      throw error
    }
  }

  async getEnhancedData(propertyData) {
    try {
      const response = await fetch(`${this.baseUrl}/enhanced-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyData })
      })

      if (!response.ok) {
        throw new Error(`Enhanced data API error: ${response.status}`)
      }

      return await response.json()

    } catch (error) {
      console.error('Enhanced data client error:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
```

### 3. Update PropertyDetailsForm Component

Replace the form submission in `/src/components/PropertyDetailsForm.jsx`:

```javascript
// Replace the existing handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Validate required fields
  if (!formData.doorNumber || !formData.fullAddress || !formData.propertyType || 
      !formData.bedrooms || !formData.condition || !formData.fullName || 
      !formData.email || !formData.phone || !formData.contactPermission) {
    setError('Please fill in all required fields and agree to be contacted.')
    return
  }
  
  setIsSubmitting(true)
  setError(null)
  
  try {
    console.log('Processing property valuation via Vercel API...', formData)
    
    // Call Vercel API route instead of direct service
    const result = await apiClient.processPropertyOffer(formData)
    
    if (result.success) {
      setOfferResult(result.data)
      console.log('Offer calculated successfully:', result.data)
    } else {
      // Use fallback if APIs failed
      setOfferResult({
        success: false,
        offer: result.fallback,
        message: result.message
      })
      console.log('Using fallback calculation:', result.fallback)
    }
    
  } catch (error) {
    console.error('Error processing offer:', error)
    setError('Sorry, we encountered an issue processing your request. Please try again or call us directly.')
  } finally {
    setIsSubmitting(false)
  }
}
```

And add the import at the top:
```javascript
import { apiClient } from '../services/apiClient.js'
```

### 4. Environment Variables Setup

#### Development (`.env.local`):
```env
# Server-side API keys (secure)
PROPERTYDATA_API_KEY=your_propertydata_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Enhanced accuracy APIs (optional)
EPC_API_KEY=your_epc_api_key_here
TFL_API_KEY=your_tfl_api_key_here
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

#### Production (Vercel Dashboard):
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each API key as a new environment variable
4. Set Environment to "Production" for each

**Important**: Remove `REACT_APP_` prefix from API keys since they're now server-side only.

### 5. Project Structure

Your project should now look like:
```
samedayhome/
├── api/
│   ├── property-valuation.js    # Main valuation endpoint
│   └── enhanced-data.js         # Enhanced data endpoint (optional)
├── src/
│   ├── components/
│   ├── services/
│   │   ├── apiClient.js         # Frontend API client
│   │   ├── propertyValuation.js # Server-side service
│   │   └── enhancedDataServices.js # Enhanced data service
│   └── ...
├── .env.local                   # Development environment
└── vercel.json                  # Vercel configuration
```

### 6. Vercel Configuration

Create/update `vercel.json`:
```json
{
  "functions": {
    "api/property-valuation.js": {
      "maxDuration": 30
    },
    "api/enhanced-data.js": {
      "maxDuration": 20
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 7. Deployment Steps

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add Vercel API routes for secure backend"
   git push
   ```

2. **Set environment variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all your API keys (without `REACT_APP_` prefix)

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### 8. Testing

#### Development Testing:
```bash
npm run dev
# Test at http://localhost:3000
```

#### Production Testing:
After deployment, test your live Vercel URL with real property data.

## Benefits of Vercel Backend

### ✅ **Security**
- API keys hidden from frontend
- Server-side validation
- Rate limiting protection

### ✅ **Performance** 
- Edge function deployment
- Automatic scaling
- Built-in caching

### ✅ **Reliability**
- Error handling at API level
- Graceful fallbacks
- Monitoring and logs

## Migration Summary

**Before**: Frontend makes direct API calls (keys exposed)
**After**: Frontend calls Vercel API routes (keys secure)

**Zero functionality changes** - just moved API calls to secure backend routes while maintaining the same user experience.

## Cost Impact

**Vercel Functions**: 
- Free tier: 100GB-hours/month
- Pro: $20/month for unlimited usage
- Your API calls should easily fit within free tier

**Total monthly cost unchanged**: Still ~£35-50 for PropertyData + OpenAI APIs.