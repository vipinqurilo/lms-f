export function StatsCard({ title, value, subtitle }) {
  return (
    <div className="bg-white border p-6 rounded-lg shadow-sm">
      <div className="text-4xl font-bold text-dark mb-2">{value}</div>
      <h3 className="text-gray-500">{title}</h3>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
