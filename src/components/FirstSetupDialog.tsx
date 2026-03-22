import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface FirstSetupDialogProps {
  isOpen: boolean;
  onComplete: (data: {
    partner1: string;
    partner2: string;
    gender1: 'male' | 'female' | '';
    gender2: 'male' | 'female' | '';
    weddingDate: string;
    planningStartDate: string;
  }) => void;
}

export default function FirstSetupDialog({ isOpen, onComplete }: FirstSetupDialogProps) {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [gender1, setGender1] = useState<'male' | 'female' | ''>('');
  const [gender2, setGender2] = useState<'male' | 'female' | ''>('');
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
      gender1,
      gender2,
      weddingDate,
      planningStartDate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 sm:p-8 my-auto">
        <div className="text-center mb-6">
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

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                className="block font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}
              >
                Partner 1 Name *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender1('female')}
                  className={`text-2xl p-2 rounded transition-all ${
                    gender1 === 'female'
                      ? 'bg-pink-100 ring-2 ring-pink-500'
                      : 'hover:bg-gray-200'
                  }`}
                  title="Braut"
                >
                  👰
                </button>
                <button
                  type="button"
                  onClick={() => setGender1('male')}
                  className={`text-2xl p-2 rounded transition-all ${
                    gender1 === 'male'
                      ? 'bg-blue-100 ring-2 ring-blue-500'
                      : 'hover:bg-gray-200'
                  }`}
                  title="Bräutigam"
                >
                  🤵
                </button>
              </div>
            </div>
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
            <div className="flex items-center justify-between mb-2">
              <label
                className="block font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}
              >
                Partner 2 Name *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender2('female')}
                  className={`text-2xl p-2 rounded transition-all ${
                    gender2 === 'female'
                      ? 'bg-pink-100 ring-2 ring-pink-500'
                      : 'hover:bg-gray-200'
                  }`}
                  title="Braut"
                >
                  👰
                </button>
                <button
                  type="button"
                  onClick={() => setGender2('male')}
                  className={`text-2xl p-2 rounded transition-all ${
                    gender2 === 'male'
                      ? 'bg-blue-100 ring-2 ring-blue-500'
                      : 'hover:bg-gray-200'
                  }`}
                  title="Bräutigam"
                >
                  🤵
                </button>
              </div>
            </div>
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
