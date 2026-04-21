import { notFound } from "next/navigation";
import { universitiesData } from "@/lib/universities-data";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { 
  MapPin, 
  Users, 
  BookOpen, 
  Star, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Award,
  Globe
} from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const university = universitiesData.find((u) => u.slug === slug);

  if (!university) {
    return { title: 'Not Found' };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocalized = (obj: any) => obj[locale as keyof typeof obj] || obj['en'];

  return {
    title: `${getLocalized(university.name)} | Ansor Edu`,
    description: getLocalized(university.description),
  };
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const t = await getTranslations();
  
  const university = universitiesData.find((u) => u.slug === slug);

  if (!university) {
    notFound();
  }

  // Obyektlardan joriy tilga mos matnni olish uchun yordamchi funksiya
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocalized = (obj: any) => obj[locale as keyof typeof obj] || obj['en'];

  const benefits = [
    "flight", 
    "accommodation", 
    "healthcare", 
    "allowance", 
    "meals", 
    "materials", 
    "transport", 
    "bonus"
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-125 overflow-hidden">
         {/* Background Image */}
         <Image 
           src={university.image} 
           alt={getLocalized(university.name)} 
           fill 
           className="object-cover" 
           priority 
           sizes="100vw"
         />
         {/* Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-900/50 to-transparent" />
         
         {/* Back Button */}
         <div className="absolute top-6 left-6 lg:left-24 z-10">
            <Link 
              href="/universities" 
              className="group flex items-center text-white/90 hover:text-white gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium text-sm">{t("nav.universities")}</span>
            </Link>
         </div>

         {/* Hero Content */}
         <div className="absolute bottom-0 left-0 w-full p-6 lg:px-24 pb-12 text-white">
            <div className="max-w-4xl space-y-5 animate-in slide-in-from-bottom-8 duration-700 fade-in">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {university.tags.map(tag => (
                   <span 
                     key={tag} 
                     className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full text-sm font-semibold tracking-wide shadow-lg border border-blue-400/30"
                   >
                     {tag}
                   </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-sans tracking-tight leading-tight text-white drop-shadow-md">
                {getLocalized(university.name)}
              </h1>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-blue-50 mt-4">
                <p className="flex items-center text-lg gap-2 font-medium bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                   <MapPin className="w-5 h-5 text-blue-400" />
                   {getLocalized(university.location)}
                </p>
                <div className="flex items-center gap-2 font-medium bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                   <Globe className="w-5 h-5 text-emerald-400" />
                   <span>Top University</span>
                </div>
              </div>
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-24 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Column: Description & Grants */}
        <div className="lg:col-span-2 space-y-8">
           {/* Section: About */}
           <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-300">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                   {t("about.badge")}
                </h2>
             </div>
             <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {getLocalized(university.description)}
             </p>
           </section>

           {/* Section: Full Scholarship Benefits */}
           <section className="bg-linear-to-br from-emerald-50 to-teal-50/30 p-8 md:p-10 rounded-3xl shadow-sm border border-emerald-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Award className="w-48 h-48" />
             </div>
             
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {t("grants.badge")}
                  </h2>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                 {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-4 group">
                      <div className="mt-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-slate-700 font-medium text-[1.05rem] group-hover:text-emerald-700 transition-colors">
                        {t(`grants.${benefit}`)}
                      </span>
                    </div>
                 ))}
               </div>
             </div>
           </section>
        </div>

        {/* Right Column: Key Metrics & CTA */}
        <div className="relative">
           <div className="sticky top-28 space-y-6">
              
              {/* Info Card */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
                 <h3 className="text-xl font-bold mb-8 text-slate-900 border-b border-slate-100 pb-4">
                   University Details
                 </h3>
                 
                 <div className="space-y-6">
                    {/* Ranking */}
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-slate-500 mb-1">{t("universities.ranking")}</p>
                         <p className="font-bold text-slate-900 text-lg">{university.ranking || "N/A"}</p>
                      </div>
                    </div>
                    
                    {/* Founded */}
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-slate-500 mb-1">{t("universities.founded")}</p>
                         <p className="font-bold text-slate-900 text-lg">{university.founded}</p>
                      </div>
                    </div>

                    {/* Students */}
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-slate-500 mb-1">{t("universities.students")}</p>
                         <p className="font-bold text-slate-900 text-lg">{university.students}</p>
                      </div>
                    </div>

                    {/* Faculties */}
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-slate-500 mb-1">{t("universities.faculties")}</p>
                         <p className="font-bold text-slate-900 text-lg">{university.faculties}</p>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Apply CTA Card */}
              <div className="bg-linear-to-br from-blue-600 to-blue-700 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                 {/* Decorative background elements */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/30 rounded-full blur-2xl -ml-10 -mb-10"></div>
                 
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-3">{t("cta.title")}</h3>
                   <p className="text-blue-100 mb-8 text-sm leading-relaxed">{t("cta.subtitle")}</p>
                   
                   <Link 
                      href="/contact" 
                      className="flex items-center justify-center w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] border border-transparent hover:border-blue-100"
                   >
                      {t("nav.apply")}
                   </Link>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}