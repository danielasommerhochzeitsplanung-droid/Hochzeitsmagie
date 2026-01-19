import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Download, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { storage } from '../lib/storage-adapter';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  isExporting: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      isExporting: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Global Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleExport = async (): Promise<void> => {
    this.setState({ isExporting: true });

    try {
      const result = await storage.exportAll();

      if (result.ok && result.data) {
        const dataStr = JSON.stringify(result.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `wedding-data-emergency-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error('Export failed:', result.error);
      }
    } catch (err) {
      console.error('Failed to export data:', err);
    } finally {
      this.setState({ isExporting: false });
    }
  };

  toggleDetails = (): void => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-12 h-12 text-amber-500" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h1>
                <p className="text-gray-600 mb-4">
                  The application encountered an unexpected error. Don't worry - your data is safe.
                  You can export your data and reload the page to continue.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Page
              </button>
              <button
                onClick={this.handleExport}
                disabled={this.state.isExporting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {this.state.isExporting ? 'Exporting...' : 'Export Data'}
              </button>
            </div>

            <div className="border-t pt-4">
              <button
                onClick={this.toggleDetails}
                className="w-full flex items-center justify-between text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Technical Details</span>
                {this.state.showDetails ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {this.state.showDetails && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Error Message:</h3>
                    <pre className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-900 overflow-x-auto">
                      {this.state.error?.toString() || 'Unknown error'}
                    </pre>
                  </div>

                  {this.state.error?.stack && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Stack Trace:</h3>
                      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700 overflow-x-auto max-h-64 overflow-y-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}

                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Component Stack:</h3>
                      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700 overflow-x-auto max-h-64 overflow-y-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
