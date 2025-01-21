import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, PhoneCall } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "E-mail",
      value: "bilek@vlastimilbilek.cz",
      href: "mailto:bilek@vlastimilbilek.cz",
      iconColor: "text-blue-500 group-hover:text-blue-600",
      hoverBg: "hover:bg-blue-50",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Mobilní telefon",
      value: "+420 605 961 946",
      href: "tel:+420605961946",
      iconColor: "text-green-500 group-hover:text-green-600",
      hoverBg: "hover:bg-green-50",
    },
    {
      icon: <PhoneCall className="w-5 h-5" />,
      label: "Pevná linka",
      value: "+420 241 723 937",
      href: "tel:+420241723937",
      iconColor: "text-teal-500 group-hover:text-teal-600",
      hoverBg: "hover:bg-teal-50",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Adresa",
      value: "K Betáni 798/43, Kunratice, 148 00 Praha 4",
      href: "https://maps.google.com/?q=K+Betáni+798/43,+Kunratice,+148+00+Praha+4",
      iconColor: "text-red-500 group-hover:text-red-600",
      hoverBg: "hover:bg-red-50",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-8 text-center">
            Kontakt
          </h1>

          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="grid lg:grid-cols-5 h-full">
              {/* Contact Information */}
              <div className="lg:col-span-2 p-8 lg:border-r border-brand-100">
                <div className="sticky top-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-brand-900 mb-2">
                      Ing. Vlastimil Bílek
                    </h2>
                    <p className="text-brand-600">
                      Technický poradce v oblasti životního prostředí
                    </p>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.href}
                        target={info.icon.type === MapPin ? "_blank" : undefined}
                        rel={info.icon.type === MapPin ? "noopener noreferrer" : undefined}
                        className={`flex items-start gap-4 p-4 rounded-lg transition-colors group ${info.hoverBg}`}
                      >
                        <div className={`transition-colors mt-1 ${info.iconColor}`}>
                          {info.icon}
                        </div>
                        <div>
                          <div className="font-medium text-brand-900 mb-1">{info.label}</div>
                          <div className="text-brand-600 group-hover:text-brand-800 transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-3 h-[600px] lg:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.669831954717!2d14.478828776888611!3d50.01646791782466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b922d831c2b67%3A0x2b30900b5c2c8b36!2zSyBCZXTDoW5pIDc5OC80MywgMTQ4IDAwIFByYWhhIDQ!5e0!3m2!1scs!2scz!4v1705007406169!5m2!1scs!2scz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-300"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 