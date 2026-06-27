import React from 'react';

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in their child component tree.
 *
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error('[ErrorBoundary]:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const reset = () => this.setState({ hasError: false, error: null });

      if (this.props.fallback) {
        return this.props.fallback({ error: this.state.error, reset });
      }

      return (
        <div
          className="p-4 bg-red-100/10 border border-red-500 rounded-lg text-center"
          role="alert"
        >
          <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h2>
          <p className="text-sm opacity-80">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
