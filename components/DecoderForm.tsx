import { useState } from 'react';

interface DecoderFormProps {
  onSubmit: (formData: Record<string, string>) => Promise<any>;
  onSubscribe: () => void;
  isSubscribed: boolean;
  maxFreeUses: number;
}

export default function DecoderForm({ onSubmit, onSubscribe, isSubscribed, maxFreeUses }: DecoderFormProps) {
  const [formData, setFormData] = useState({
    usersName: '',
    preferredStarSign: '',
    whatDoYouWant: '',
    places: '',
    ageRange: '',
  });
  const [usage, setUsage] = useState(0);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubscribed && usage >= maxFreeUses) {
      onSubscribe();
      return;
    }
    setLoading(true);
    const res = await onSubmit(formData);
    setLoading(false);
    setResult(res.advice || '');
    if (!isSubscribed) setUsage(u => u + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
          <input
            name={key}
            value={value}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>
      ))}
      <button type="submit" className="w-full px-4 py-2 rounded bg-primary text-white">
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {result && <div className="mt-4 p-4 bg-gray-100 rounded">{result}</div>}
    </form>
  );
}
