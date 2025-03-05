"use client";
import { Mail, Phone, MapPin, PhoneCall, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Check if user is logged in as admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, []);

  const handleAdminClick = () => {
    if (isAdmin) {
      router.push("/admin/novinky");
    } else {
      router.push("/admin/login?redirect=/admin/novinky");
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      value: "bilek@vlastimilbilek.cz",
      href: "mailto:bilek@vlastimilbilek.cz",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      value: "+420 605 961 946",
      href: "tel:+420605961946",
    },
    {
      icon: <PhoneCall className="w-4 h-4" />,
      value: "+420 241 723 937",
      href: "tel:+420241723937",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      value: "K Betáni 798/43, Kunratice, 148 00 Praha 4",
      href: "https://maps.google.com/?q=K+Betáni+798/43,+Kunratice,+148+00+Praha+4",
    },
  ];

  return (
    <footer className="bg-white border-t border-brand-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info */}
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.href}
              target={info.icon.type === MapPin ? "_blank" : undefined}
              rel={info.icon.type === MapPin ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 transition-colors"
            >
              {info.icon}
              <span>{info.value}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-brand-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-600">
            <div>
              © {currentYear} Ing. Vlastimil Bílek. Všechna práva vyhrazena.
            </div>
            <div className="flex gap-4">
              <Link href="/kontakt" className="hover:text-brand-800 transition-colors">
                Kontakt
              </Link>
              <Link href="/reference" className="hover:text-brand-800 transition-colors">
                Reference
              </Link>
              <button
                onClick={handleAdminClick}
                className="flex items-center gap-1 hover:text-brand-800 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 