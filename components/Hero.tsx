import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient Overlay and add blur effect*/}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ing. Vlastimil Bílek
          </h1>
          <p className="text-lg md:text-xl text-brand-100 mb-8">
            Jsem tady, abych vám pomohl zvládnout všechny technické, legislativní a provozní výzvy spojené s ochranou životního prostředí – od odborných posudků až po praktická řešení a zastupování před úřady.
          </p>
          <Button 
            size="lg" 
            className="bg-brand-500 hover:bg-brand-600 text-white transition-colors"
            
          >
            <Link href="/sluzby">Moje služby</Link>
            <ArrowRightIcon size={16} className="ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 