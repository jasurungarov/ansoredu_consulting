// "use client";

// import Link from "next/link";
// import { ArrowRight, Clock, Tag } from "lucide-react";
// import { IBlog } from "@/types";
// import { useLanguage } from "@/context/LanguageContext";
// import { formatDate } from "@/lib/utils";
// import { cn } from "@/lib/utils";

// interface BlogCardProps {
//   post: IBlog;
//   className?: string;
// }

// const categoryColors: Record<string, string> = {
//   scholarships: "bg-blue-50 text-blue-700",
//   "university-news": "bg-purple-50 text-purple-700",
//   "student-tips": "bg-green-50 text-green-700",
// };

// const categoryLabels: Record<string, { uz: string; ru: string }> = {
//   scholarships: { uz: "Grantlar", ru: "Гранты" },
//   "university-news": { uz: "Universitet yangiliklari", ru: "Новости университетов" },
//   "student-tips": { uz: "Talaba maslahatlari", ru: "Советы студентам" },
// };

// export default function BlogCard({ post, className }: BlogCardProps) {
//   const { language } = useLanguage();

//   return (
//     <article
//       className={cn(
//         "group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden",
//         className
//       )}
//     >
//       {/* Cover */}
//       <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden">
//         {post.coverImage ? (
//           <img
//             src={post.coverImage}
//             alt={post.title[language]}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <span className="text-5xl opacity-30">📰</span>
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//         <div className="absolute bottom-3 left-3">
//           <span
//             className={cn(
//               "text-xs font-semibold px-2.5 py-1 rounded-full",
//               categoryColors[post.category] || "bg-gray-100 text-gray-600"
//             )}
//           >
//             {categoryLabels[post.category]?.[language] || post.category}
//           </span>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-5">
//         <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
//           <span>{formatDate(post.createdAt, language)}</span>
//           <span>•</span>
//           <span className="flex items-center gap-1">
//             <Clock size={11} />
//             {post.readingTime} min
//           </span>
//         </div>

//         <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
//           {post.title[language]}
//         </h3>
//         <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
//           {post.excerpt[language]}
//         </p>

//         <Link
//           href={`/blog/${post.slug}`}
//           className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           O&apos;qish
//           <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </div>
//     </article>
//   );
// }
