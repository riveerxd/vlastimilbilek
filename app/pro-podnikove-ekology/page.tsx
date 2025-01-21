import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CorporateEcologistsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-8 text-center">
            Pro podnikové ekology
          </h1>
          
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="relative h-[300px] md:h-full">
                <Image
                  src="/images/zpravodaj.png"
                  alt="Zpravodaj"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-2">
                      Ochrana ovzduší - novelizace
                    </h2>
                    <p className="text-lg font-medium text-brand-800">
                      Změny v předpisech na ochranu ovzduší v připravované novelizaci (2024/2025)
                    </p>
                  </div>

                  <p className="text-brand-600">
                    Tuto sekci budu postupně doplňovat. Aktuálně můžete sledovat můj komentář k právě schvalované novelizaci zákona č. 201/2012 Sb., o ochraně ovzduší, na LinkedIn.
                  </p>

                  <div className="flex flex-col gap-4">
                    <a
                      href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7261875035609481218"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white gap-2 group">
                        <Linkedin className="w-5 h-5" />
                        Sledovat zpravodaj na LinkedIn
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 