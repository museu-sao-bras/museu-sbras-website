import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
const EXHIBITIONS_KEY = 'exhibitions-data';
const categories = { permanent: 'Permanent' };
function getExhibitions() {
  const data = localStorage.getItem(EXHIBITIONS_KEY);
  return data ? JSON.parse(data) : [];
}
export default function PermanentExhibitions() {
  const exhibitions = getExhibitions().filter(ex => ex.category === 'permanent');
  const [activeIdx, setActiveIdx] = useState(0);

  if (exhibitions.length === 0) {
    return (
      <div className="container mx-auto min-h-screen pt-[120px] pb-16 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Permanent Exhibitions</h1>
        <p className="text-muted-foreground">No exhibitions found.</p>
      </div>
    );
  }

  const ex = exhibitions[activeIdx];

  return (
    <div className="min-h-screen pt-[120px] pb-16 flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-center">Permanent Exhibitions</h1>
      {/* Toggle bar */}
      <div className="flex overflow-x-auto border-b border-muted mb-8 px-4">
        {exhibitions.map((e, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 whitespace-nowrap font-semibold transition-colors ${activeIdx === idx ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveIdx(idx)}
          >
            {e.title}
          </button>
        ))}
      </div>
      {/* Full screen exhibition */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {ex.images && ex.images.length > 0 && (
          <div className="flex gap-4 mb-8 overflow-x-auto w-full justify-center">
            {ex.images.map((img, i) => img && (
              <img key={i} src={img} alt={ex.title} className="max-h-[40vh] w-auto object-contain rounded shadow" />
            ))}
          </div>
        )}
        <h2 className="text-3xl font-bold mb-4 text-center">{ex.title}</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">{ex.description}</p>
      </div>
    </div>
  );
}
