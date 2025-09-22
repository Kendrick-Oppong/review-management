import { BookOpen, Building2, Info, Mail } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center relative">
            <Image src="/LOGO.webp" width={120} height={30}  alt="logo" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <Building2 size={15} /> <span>Landlords</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                <Info size={15} />
              </div>
              <span>About Us</span>
            </div>

            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <BookOpen size={15} /> <span>Careers</span>
            </div>

            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <Mail size={15} /> <span>Contact</span>
            </div>
          </nav>

          {/* Language and Currency */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <span className="flex items-center">
                <span className="pr-4">🇬🇧</span>English
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700">
              <span className="text-lg">£</span>
              <span className="text-sm">GBP</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
