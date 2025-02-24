import Image from "next/image";

export function StatsCard({
  title,
  value,
  iconSrc,
  isIcon = false,
  Icon,
  color,
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <div className="flex items-start gap-4">
        {isIcon ? (
          <div
            className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center`}
          >
            {Icon}
          </div>
        ) : (
          <div className={`rounded-full `}>
            <Image
              src={iconSrc || "/placeholder.svg"}
              alt={title}
              width={40}
              height={40}
              className="w-16 h-16 rounded-full"
            />
          </div>
        )}
        <div className="">
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
