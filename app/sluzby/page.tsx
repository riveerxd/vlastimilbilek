import { Card } from "@/components/ui/card";
import {
  Scroll,
  FileSpreadsheet,
  FileCheck,
  Settings,
  FileText,
  ClipboardCheck,
  Building2,
  BarChart3,
  MessageSquareWarning,
  FileInput,
  Calculator,
  HardHat,
  Factory,
  BookOpen,
  Leaf,
  Wind,
  LineChart,
  Presentation,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <Scroll className="w-6 h-6" />,
      title: "Odborné posudky",
      description: "Zpracování odborných posudků podle § 11 odst. 7 zákona č. 201/2012 Sb.",
      iconColor: "text-amber-500 group-hover:text-amber-600",
      hoverBg: "hover:bg-amber-50",
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" />,
      title: "Rozptylové studie",
      description: "Zpracování rozptylových studií podle § 11 odst. 8 zákona č. 201/2012 Sb.",
      iconColor: "text-blue-500 group-hover:text-blue-600",
      hoverBg: "hover:bg-blue-50",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Kompenzační opatření",
      description: "Kompenzační opatření podle § 11 odst. 4, 5 a 6 zákona č. 201/2012 Sb. – vyhodnocení, návrhy",
      iconColor: "text-green-500 group-hover:text-green-600",
      hoverBg: "hover:bg-green-50",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Provozní řády",
      description: "Zpracování provozních řádů podle § 12 odst. 4 písm. d) zákona č. 201/2012 Sb.",
      iconColor: "text-purple-500 group-hover:text-purple-600",
      hoverBg: "hover:bg-purple-50",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Povolení provozu",
      description: "Zpracování žádosti o povolení provozu zdrojů, jejich změn, žádostí o výjimky, atd.",
      iconColor: "text-slate-500 group-hover:text-slate-600",
      hoverBg: "hover:bg-slate-50",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Zkušební provoz",
      description: "Zpracování žádostí o povolení zkušebního provozu a vyhodnocení zkušebního provozu",
      iconColor: "text-indigo-500 group-hover:text-indigo-600",
      hoverBg: "hover:bg-indigo-50",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Provozní evidence",
      description: "Zavedení a vedení provozní evidence podle předpisů na ochranu ovzduší",
      iconColor: "text-teal-500 group-hover:text-teal-600",
      hoverBg: "hover:bg-teal-50",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "ISPOP",
      description: "Zpracování hlášení do systému ISPOP – SPE, poplatkové hlášení, IRZ",
      iconColor: "text-cyan-500 group-hover:text-cyan-600",
      hoverBg: "hover:bg-cyan-50",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Hmotnostní bilance",
      description: "Zpracování hmotnostní bilance organických rozpouštědel a dalších podkladů",
      iconColor: "text-orange-500 group-hover:text-orange-600",
      hoverBg: "hover:bg-orange-50",
    },
    {
      icon: <MessageSquareWarning className="w-6 h-6" />,
      title: "Asistence při měření",
      description: "Asistence při měření emisí, kontrolách ČIŽP",
      iconColor: "text-red-500 group-hover:text-red-600",
      hoverBg: "hover:bg-red-50",
    },
    {
      icon: <FileInput className="w-6 h-6" />,
      title: "Komunikace s úřady",
      description: "Komunikace s orgány státní správy a dalšími institucemi",
      iconColor: "text-blue-500 group-hover:text-blue-600",
      hoverBg: "hover:bg-blue-50",
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Integrované povolení",
      description: "Spolupráce případně zajištění kompletní problematiky integrovaného povolení",
      iconColor: "text-violet-500 group-hover:text-violet-600",
      hoverBg: "hover:bg-violet-50",
    },
    {
      icon: <HardHat className="w-6 h-6" />,
      title: "E.I.A.",
      description: "Spolupráce případně zajištění kompletní problematiky E.I.A.",
      iconColor: "text-yellow-500 group-hover:text-yellow-600",
      hoverBg: "hover:bg-yellow-50",
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Technologické projekty",
      description: "Spolupráce na projektech instalací a změn technologických zařízení",
      iconColor: "text-zinc-500 group-hover:text-zinc-600",
      hoverBg: "hover:bg-zinc-50",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Interní předpisy",
      description: "Spolupráce při zpracování požadavků do interních předpisů provozovatele",
      iconColor: "text-emerald-500 group-hover:text-emerald-600",
      hoverBg: "hover:bg-emerald-50",
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Ochrana ozonové vrstvy",
      description: "Problematika ochrany ozonové vrstvy země (F-plyny)",
      iconColor: "text-sky-500 group-hover:text-sky-600",
      hoverBg: "hover:bg-sky-50",
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "ESG, GHG projekty",
      description: "Odborná podpora v projektech v oblasti ESG, GHG",
      iconColor: "text-lime-500 group-hover:text-lime-600",
      hoverBg: "hover:bg-lime-50",
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      title: "Vzdělávání",
      description: 'Přednášky, semináře, školení (včetně "vnitropodnikových")',
      iconColor: "text-rose-500 group-hover:text-rose-600",
      hoverBg: "hover:bg-rose-50",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6 text-center">
            Technické a legislativní poradenství v oblasti životního prostředí
          </h1>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm mb-12">
            <p className="text-lg text-brand-600 leading-relaxed">
              Autorizaci mám na kompletní rozsah. Od kotelny na zemní plyn po elektrárny, od brusírny po ocelárny, od lakovnu v autoservisu po lakovny pro sériové lakování automobilů ve ŠKODA AUTO, a.s., od neutralizační stanice po městskou ČOV, od kompostárny po spalovnu odpadů, od malé benzinky po Rafinérii Kralupy.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`p-6 bg-white/80 backdrop-blur-sm transition-all group ${service.hoverBg}`}
              >
                <div className="flex gap-4">
                  <div className={`mt-1 transition-colors ${service.iconColor}`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-brand-600">
                      {service.description}
                    </p>
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