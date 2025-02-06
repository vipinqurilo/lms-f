import { ArrowUpRight } from "lucide-react";

export const Header = () => (
  <header className="border-b">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="bg-background rounded-lg p-2">
            <div className="w-6 h-6 bg-secondary rounded-md flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="font-semibold text-xl">Instructor Bookings</span>
        </div>
      </div>
    </div>
  </header>
);
