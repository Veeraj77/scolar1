import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { chatService } from '../services/chat.service'
import { API_CONFIG } from '../config/api.config'

export function BackendTestPanel() {
  const [testMessage, setTestMessage] = useState('Show me scholarships for engineering')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    status: 'idle' | 'success' | 'error'
    message: string
    details?: any
  }>({ status: 'idle', message: '' })

  const testConnection = async () => {
    setIsLoading(true)
    setResult({ status: 'idle', message: 'Testing connection...' })

    try {
      const response = await chatService.sendMessage(testMessage)

      if (response.success && response.data) {
        setResult({
          status: 'success',
          message: 'Backend connection successful! ✅',
          details: {
            response: response.data.message,
            sessionId: response.data.sessionId,
            timestamp: response.data.timestamp
          }
        })
      } else {
        setResult({
          status: 'error',
          message: 'Backend returned an error',
          details: response.error
        })
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to connect to backend',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testDirectFetch = async () => {
    setIsLoading(true)
    setResult({ status: 'idle', message: 'Testing direct fetch...' })

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: testMessage,
          sessionId: 'test_session',
          userId: 'test_user'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          status: 'success',
          message: 'Direct fetch successful! ✅',
          details: data
        })
      } else {
        setResult({
          status: 'error',
          message: `HTTP ${response.status}: ${response.statusText}`,
          details: data
        })
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Fetch failed - Check CORS or network',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const checkBackendHealth = async () => {
    setIsLoading(true)
    setResult({ status: 'idle', message: 'Checking backend health...' })

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        setResult({
          status: 'success',
          message: 'Backend is healthy! ✅',
          details: data
        })
      } else {
        setResult({
          status: 'error',
          message: `Health check failed: ${response.status}`,
          details: await response.text()
        })
      }
    } catch (error) {
      // Try root endpoint
      try {
        const rootResponse = await fetch(`${API_CONFIG.BASE_URL}/`, {
          method: 'GET',
        })
        
        if (rootResponse.ok) {
          const data = await rootResponse.json()
          setResult({
            status: 'success',
            message: 'Backend is running! ✅',
            details: data
          })
        } else {
          throw new Error('Root endpoint failed')
        }
      } catch {
        setResult({
          status: 'error',
          message: 'Cannot reach backend',
          details: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Backend Connection Test</CardTitle>
        <CardDescription>
          Test your connection to: {API_CONFIG.BASE_URL}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm">Test Message</label>
          <Input
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Enter test message..."
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={checkBackendHealth}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Check Health'
            )}
          </Button>

          <Button
            onClick={testDirectFetch}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Direct Fetch'
            )}
          </Button>

          <Button
            onClick={testConnection}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Chat Service'
            )}
          </Button>
        </div>

        {result.status !== 'idle' && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              {result.status === 'success' && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Badge variant="default" className="bg-green-500">Success</Badge>
                </>
              )}
              {result.status === 'error' && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <Badge variant="destructive">Error</Badge>
                </>
              )}
              {result.status === 'idle' && (
                <>
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline">Testing</Badge>
                </>
              )}
              <span className="text-sm">{result.message}</span>
            </div>

            {result.details && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground mb-2">Response Details:</p>
                <pre className="text-xs overflow-auto max-h-64">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg text-sm space-y-2">
          <p className="font-medium">Troubleshooting Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>If "Check Health" fails, your backend might be down or the URL is incorrect</li>
            <li>If you see CORS errors, add CORS middleware to your backend</li>
            <li>If "Test Direct Fetch" works but "Test Chat Service" fails, check the response format</li>
            <li>Check browser DevTools → Network tab for detailed error information</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
