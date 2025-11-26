import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const EXHIBITIONS_KEY = 'exhibitions-data';

const defaultExhibitions = [
  // Example data
];

const categories = [
  { value: 'permanent', label: 'Permanent' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'archive', label: 'Archive' },
];

function getExhibitions() {
  const data = localStorage.getItem(EXHIBITIONS_KEY);
  return data ? JSON.parse(data) : defaultExhibitions;
}

function saveExhibitions(exhibitions) {
  localStorage.setItem(EXHIBITIONS_KEY, JSON.stringify(exhibitions));
}

const ExhibitionsAdmin = () => {
  const [exhibitions, setExhibitions] = useState(getExhibitions());
  const [form, setForm] = useState({
    title: '',
    description: '',
    images: [''],
    category: 'permanent',
  });
  const [editIdx, setEditIdx] = useState(null);

  useEffect(() => {
    saveExhibitions(exhibitions);
  }, [exhibitions]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (idx, value) => {
    const newImages = [...form.images];
    newImages[idx] = value;
    setForm({ ...form, images: newImages });
  };

  const handleAddImage = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const handleRemoveImage = idx => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...exhibitions];
      updated[editIdx] = form;
      setExhibitions(updated);
      setEditIdx(null);
    } else {
      setExhibitions([...exhibitions, form]);
    }
  setForm({ title: '', description: '', images: [''], category: 'permanent' });
  };

  const handleEdit = idx => {
    setForm(exhibitions[idx]);
    setEditIdx(idx);
  };

  const handleDelete = idx => {
    setExhibitions(exhibitions.filter((_, i) => i !== idx));
    setEditIdx(null);
  setForm({ title: '', description: '', images: [''], category: 'permanent' });
  };

  return (
    <div className="container mx-auto py-[120px]">
      <h1 className="text-4xl font-bold mb-8 text-center">Exhibitions Admin</h1>
      <form onSubmit={handleSubmit} className="mb-8 grid gap-4 max-w-xl mx-auto">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <div className="grid gap-2">
          <label className="font-semibold">Image URLs</label>
          {form.images.map((img, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                value={img}
                onChange={e => handleImageChange(idx, e.target.value)}
                placeholder={`Image URL #${idx + 1}`}
                className="border p-2 rounded flex-1"
              />
              <Button type="button" size="sm" variant="destructive" onClick={() => handleRemoveImage(idx)} disabled={form.images.length === 1}>Remove</Button>
            </div>
          ))}
          <Button type="button" size="sm" onClick={handleAddImage}>Add Image</Button>
        </div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <Button type="submit" className="w-full">
          {editIdx !== null ? 'Update Exhibition' : 'Add Exhibition'}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {exhibitions.map((ex, idx) => (
          <Card key={idx} className="relative">
            <CardContent className="p-6">
              <span className="absolute top-2 right-2 px-2 py-1 bg-muted rounded text-xs">{categories.find(c => c.value === ex.category)?.label}</span>
              {ex.images && ex.images.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {ex.images.map((img, i) => img && (
                    <img key={i} src={img} alt={ex.title} className="h-20 w-20 object-cover rounded border" />
                  ))}
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{ex.title}</h3>
              <p className="text-muted-foreground mb-4">{ex.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(idx)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionsAdmin;
