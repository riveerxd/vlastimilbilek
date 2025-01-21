import { Card } from "@/components/ui/card";
import { Building2, Mail, User } from "lucide-react";

export default function ReferencesPage() {
  const references = [
    {
      company: "METALKOV spol. s r.o., Vlašim",
      contact: "Ing. Evžen Reitschläger",
      email: "evzen@metalkov.cz",
    },
    {
      company: "TEMAC, a.s.",
      contact: "Iva Baumruková",
      email: "baumrukova@temac.cz",
    },
    {
      company: "SAFINA, a.s.",
      contact: "Picková Eva",
      email: "eva.pickova@SAFINA.cz",
    },
    {
      company: "PINO AUTOMOTIVE CZ, s.r.o.",
      contact: "Petr Chromovský",
      email: "industrial-manager.cz@pinoautomotive.com",
    },
    {
      company: "MLÝN PERNER SVIJANY, spol. s r. o.",
      contact: "Jitka Perner",
      email: "jitka.perner@mlynperner.cz",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-8 text-center">
            Reference
          </h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            {references.map((reference, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all group">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors mt-1" />
                    <div className="font-semibold text-brand-900">{reference.company}</div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors mt-1" />
                    <div className="text-brand-600">{reference.contact}</div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors mt-1" />
                    <a 
                      href={`mailto:${reference.email}`}
                      className="text-brand-600 hover:text-brand-800 transition-colors"
                    >
                      {reference.email}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 