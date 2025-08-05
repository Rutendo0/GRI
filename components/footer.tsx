
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Logo and Links */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Image 
                src="/logo.png" 
                alt="GRI Logo" 
                width={80} 
                height={80} 
                className="object-contain" 
                sizes="80px"
                quality={95}
              />
              <div>
                <h3 className="text-xl font-bold">GRI</h3>
                <p className="text-sm text-gray-400">
                  Gorilla Research and Investments – Innovating for Africa's Future
                </p>
              </div>
            </div>

            <nav className="space-y-3">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href="mailto:info@griafrica.com" className="text-gray-300 hover:text-white transition-colors">
                  info@griafrica.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <p className="text-gray-300">
                  7 George Silundika ave, Harare CBD,
                  <br />
                  Harare, Zimbabwe
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61578689275784" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/gorilla-research-and-investments/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">copyright @gorilla research and investments 2025</p>
        </div>
      </div>
    </footer>
  )
}
