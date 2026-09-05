import { Layers, Gem, SunMedium, Sprout, Truck, Cpu, ArrowRight } from 'lucide-react';

export default function PilaresSection() {
  const pilares = [
    {
      id: "01",
      name: "Minería Estratégica",
      desc: "Complejo de extracción de carbonato de litio, minería polimetálica y red de proveedores locales integrados.",
      tag: "Salar de Olaroz / Cauchari",
      icon: Gem,
      color: "text-pilar-litio",
      bgColor: "bg-pilar-litio/15",
      borderColor: "hover:border-pilar-litio/50"
    },
    {
      id: "02",
      name: "Energía Solar",
      desc: "Parque Solar Cauchari y proyectos de generación fotovoltaica limpia de extrema altura en la Puna.",
      tag: "Matriz Verde 300+ MW",
      icon: SunMedium,
      color: "text-pilar-solar",
      bgColor: "bg-pilar-solar/15",
      borderColor: "hover:border-pilar-solar/50"
    },
    {
      id: "03",
      name: "Complejo Agroindustrial",
      desc: "Azúcar, tabaco, cítricos, legumbres, bioetanol y vinos de extrema altura reconocidos a nivel global.",
      tag: "Valles y Yungas",
      icon: Sprout,
      color: "text-pilar-agro",
      bgColor: "bg-pilar-agro/15",
      borderColor: "hover:border-pilar-agro/50"
    },
    {
      id: "04",
      name: "Eje Logístico",
      desc: "Corredor Bioceánico del Trópico de Capricornio, Paso de Jama y Zonas Francas de Perico y La Quiaca.",
      tag: "Conexión Atlántico-Pacífico",
      icon: Truck,
      color: "text-pilar-logistica",
      bgColor: "bg-pilar-logistica/15",
      borderColor: "hover:border-pilar-logistica/50"
    },
    {
      id: "05",
      name: "Economía Conocimiento",
      desc: "Desarrollo de software, robótica, inteligencia artificial y servicios basados en talento jujeño.",
      tag: "Polo Tecnológico ClusteAR",
      icon: Cpu,
      color: "text-pilar-tech",
      bgColor: "bg-pilar-tech/15",
      borderColor: "hover:border-pilar-tech/50"
    },
  ];

  return (
    <section id="pilares" className="min-h-screen flex flex-col justify-center py-20 relative">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-aqua/10 border border-brand-aqua/30 text-brand-aqua text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Matriz Productiva Provincial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Los 5 Pilares de <span className="gradient-text">Jujuy al Mundo</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            La oferta de la exposición organizada sobre los sectores estratégicos que lideran el desarrollo del Norte Grande.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pilares.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.id}
                className={`glass-card rounded-2xl p-5 border border-white/5 ${p.borderColor} transition-all group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${p.bgColor} flex items-center justify-center ${p.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${p.color}`}>Pilar {p.id}</span>
                  <h3 className="text-lg font-bold font-heading text-white mt-1 mb-2">{p.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span>{p.tag}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${p.color}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
