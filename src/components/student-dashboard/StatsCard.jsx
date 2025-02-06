import Image from "next/image"

export function StatsCard({ title, value, iconSrc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-start gap-4">
        <div className={`rounded-full `}>
          <Image src={iconSrc || "/placeholder.svg"} alt={title} width={40} height={40} className="w-16 h-16" />
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

