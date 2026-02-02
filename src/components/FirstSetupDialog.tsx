import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface FirstSetupDialogProps {
  isOpen: boolean;
  onComplete: (data: {
    partner1: string;
    partner2: string;
    weddingDate: string;
    planningStartDate: string;
  }) => void;
}

export default function FirstSetupDialog({ isOpen, onComplete }: FirstSetupDialogProps) {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [planningStartDate, setPlanningStartDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!partner1.trim() || !partner2.trim() || !weddingDate || !planningStartDate) {
      alert('Bitte fülle alle Felder aus');
      return;
    }

    onComplete({
      partner1: partner1.trim(),
      partner2: partner2.trim(),
      weddingDate,
      planningStartDate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d', fontWeight: 'normal' }}
          >
            Willkommen bei Hochzeitsmagie
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.95rem' }}
          >
            Lass uns mit den wichtigsten Informationen beginnen
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block mb-2 font-medium"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}
            >
              Partner 1 Name *
            </label>
            <input
              type="text"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#3b3b3d',
                borderColor: '#d6b15b',
                fontSize: '0.95rem'
              }}
              placeholder="z.B. Anna"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}
            >
              Partner 2 Name *
            </label>
            <input
              type="text"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#3b3b3d',
                borderColor: '#d6b15b',
                fontSize: '0.95rem'
              }}
              placeholder="z.B. Max"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}
            >
              Hochzeitsdatum *
            </label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#3b3b3d',
                borderColor: '#d6b15b',
                fontSize: '0.95rem'
              }}
              required
            />
            <p
              className="text-sm text-gray-500 mt-1"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Kann jederzeit angepasst werden
            </p>
          </div>

          <div>
            <label
              className="block mb-2 font-medium"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}
            >
              Wann möchtet ihr mit der Planung beginnen? *
            </label>
            <input
              type="date"
              value={planningStartDate}
              onChange={(e) => setPlanningStartDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#3b3b3d',
                borderColor: '#d6b15b',
                fontSize: '0.95rem'
              }}
              required
            />
            <div
              className="mt-2 p-3 bg-pink-50 border border-pink-200 rounded-lg"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <p className="text-sm text-pink-800 flex items-center gap-2">
                <span>💝</span>
                <span>
                  Genießt erst einmal euer Ja zueinander! Das Planungsdatum könnt ihr jederzeit anpassen.
                </span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-md hover:shadow-lg"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              backgroundColor: '#d6b15b',
              fontSize: '1rem'
            }}
          >
            Los geht's!
          </button>
        </form>
      </div>
    </div>
  );
}
