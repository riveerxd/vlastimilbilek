import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const timeline = [
    {
      period: "1983-1988",
      title: "VŠCHT, FCHT",
      description: "Obor Technologie jaderných paliv a radiochemie",
      icon: "🎓",
    },
    {
      period: "1989-1990",
      title: "Aspirantura na VŠCHT",
      description: "Katedra analytické chemie (specializace na radiochemii – lanthanoidy) – s ohledem na totální rozpad oboru (včetně těžby a zpracování uranu v ČR) nedokončeno…",
      icon: "🔬",
    },
    {
      period: "1990-2002",
      title: "Inspektor České inspekce životního prostředí",
      description: "Oblastní inspektorát Praha, oddělení ochrany ovzduší",
      icon: "⚖️",
    },
    {
      period: "2002-současnost",
      title: "Technický poradce v oblasti životního prostředí",
      description: "Se zaměřením na ochranu ovzduší",
      icon: "🌱",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900">
              Ing. Vlastimil Bílek
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mt-4">
              Profesní Cesta
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 -ml-0.5" />

            {/* Timeline items */}
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -ml-3.5 mt-8 w-7 h-7 bg-brand-100 border-4 border-brand-500 rounded-full" />
                  
                  {/* Content */}
                  <Card className={`relative ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'} p-6 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm`}>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <div className="text-brand-600 font-semibold mb-1">{item.period}</div>
                        <h3 className="text-xl font-semibold text-brand-900 mb-2">{item.title}</h3>
                        <p className="text-brand-600/90">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 