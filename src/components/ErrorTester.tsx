import { useState } from 'react';

export function ErrorTester() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error thrown by ErrorTester component');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors font-medium"
      >
        Test Error Boundary
      </button>
    </div>
  );
}
