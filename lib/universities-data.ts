export interface University {
  id: string;
  name: {
    uz: string;
    kg: string;
    ru: string;
    en: string;
  };
  location: {
    uz: string;
    kg: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    kg: string;
    ru: string;
    en: string;
  };
  logo?: string;
  image: string;
  slug: string;
  ranking?: string;
  founded: string;
  students: string;
  faculties: number;
  tags: string[];
}

export const universitiesData: University[] = [
  {
    id: "kau",
    name: {
      uz: "King Abdulaziz University (KAU)",
      kg: "Король Абдулазиз университети (KAU)",
      ru: "Университет имени Короля Абдулазиза (KAU)",
      en: "King Abdulaziz University (KAU)"
    },
    location: {
      uz: "Jidda, Saudiya Arabistoni",
      kg: "Жидда, Сауд Арабиясы",
      ru: "Джидда, Саудовская Аравия",
      en: "Jeddah, Saudi Arabia"
    },
    description: {
      uz: "Saudiya Arabistonining eng nufuzli universitetlaridan biri. QS World University Rankings bo'yicha dunyoda kuchli 150 talikka kiradi.",
      kg: "Сауд Арабиясынын эң абройлуу университеттеринин бири. QS World University Rankings боюнча дүйнөдөгү эң мыкты 150 университеттин катарына кирет.",
      ru: "Один из самых престижных университетов Саудовской Аравии. Входит в топ-150 лучших университетов мира по версии QS World University Rankings.",
      en: "One of the most prestigious universities in Saudi Arabia. Ranked among the top 150 in the world by QS World University Rankings."
    },
    logo: "/unvr/kau-logo.png",
    image: "",
    slug: "king-abdulaziz-university",
    ranking: "143",
    founded: "1967",
    students: "82,000+",
    faculties: 24,
    tags: ["Engineering", "Medicine", "IT", "Business"]
  },
  {
    id: "ium",
    name: {
      uz: "Madina Islom Universiteti (IUM)",
      kg: "Медина Ислам университети (IUM)",
      ru: "Исламский университет Медины (IUM)",
      en: "Islamic University of Madinah (IUM)"
    },
    location: {
      uz: "Madina, Saudiya Arabistoni",
      kg: "Медина, Сауд Арабиясы",
      ru: "Медина, Саудовская Аравия",
      en: "Madinah, Saudi Arabia"
    },
    description: {
      uz: "Dunyodagi eng mashhur islomiy ta'lim muassasalaridan biri. Chet ellik talabalar uchun 100% grant dasturlari mavjud.",
      kg: "Дүйнөдөгү эң белгилүү исламдык билим берүү мекемелеринин бири. Чет өлкөлүк студенттер үчүн 100% гранттык программалар бар.",
      ru: "Одно из самых известных исламских учебных заведений в мире. Предлагает 100% грантовые программы для иностранных студентов.",
      en: "One of the most famous Islamic educational institutions in the world. Offers 100% scholarship programs for international students."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1590076247564-a29d58ed5c1d?w=800&q=80",
    slug: "islamic-university-of-madinah",
    ranking: "Top 1000",
    founded: "1961",
    students: "22,000+",
    faculties: 9,
    tags: ["Sharia", "Arabic Language", "Holy Quran"]
  },
  {
    id: "ksu",
    name: {
      uz: "Qirol Saud Universiteti (KSU)",
      kg: "Король Сауд университети (KSU)",
      ru: "Университет Короля Сауда (KSU)",
      en: "King Saud University (KSU)"
    },
    location: {
      uz: "Riyoz, Saudiya Arabistoni",
      kg: "Эр-Рияд, Сауд Арабиясы",
      ru: "Эр-Рияд, Саудовская Аравия",
      en: "Riyadh, Saudi Arabia"
    },
    description: {
      uz: "Saudiya Arabistonidagi birinchi universitet. Tadqiqot va innovatsiyalar bo'yicha yetakchi.",
      kg: "Сауд Арабиясындагы биринчи университет. Изилдөө жана инновациялар боюнча алдыңкы орунда.",
      ru: "Первый университет в Саудовской Аравии. Лидер в области исследований и инноваций.",
      en: "The first university in Saudi Arabia. A leader in research and innovation."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    slug: "king-saud-university",
    ranking: "203",
    founded: "1957",
    students: "65,000+",
    faculties: 22,
    tags: ["Medicine", "Science", "Engineering"]
  },
  {
    id: "kaust",
    name: {
      uz: "Qirol Abdulla Fan va Texnologiya Universiteti (KAUST)",
      kg: "Король Абдулла илим жана технология университети (KAUST)",
      ru: "Университет науки и технологий имени короля Абдуллы (KAUST)",
      en: "King Abdullah University of Science and Technology (KAUST)"
    },
    location: {
      uz: "Tuval, Saudiya Arabistoni",
      kg: "Тувал, Сауд Арабиясы",
      ru: "Тувал, Саудовская Аравия",
      en: "Thuwal, Saudi Arabia"
    },
    description: {
      uz: "Faqat magistratura va doktorantura uchun ixtisoslashgan dunyo darajasidagi tadqiqot universiteti.",
      kg: "Магистратура жана докторантура үчүн гана адистештирилген дүйнөлүк деңгээлдеги изилдөө университети.",
      ru: "Исследовательский университет мирового уровня, специализирующийся исключительно на магистратуре и докторантуре.",
      en: "A world-class research university specializing exclusively in graduate studies (Master's and PhD)."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    slug: "kaust",
    ranking: "Research Excellence",
    founded: "2009",
    students: "1,500+",
    faculties: 3,
    tags: ["Engineering", "Biology", "Environment", "CS"]
  },
  {
    id: "pnu",
    name: {
      uz: "Malika Nora bint Abdulrahmon Universiteti",
      kg: "Принцесса Нура бинт Абдулрахман университети",
      ru: "Университет принцессы Нуры бинт Абдулрахман",
      en: "Princess Nora bint Abdulrahman University"
    },
    location: {
      uz: "Riyoz, Saudiya Arabistoni",
      kg: "Эр-Рияд, Сауд Арабиясы",
      ru: "Эр-Рияд, Саудовская Аравия",
      en: "Riyadh, Saudi Arabia"
    },
    description: {
      uz: "Dunyodagi eng katta ayollar universiteti. Ayollar uchun to'liq grantlar taqdim etadi.",
      kg: "Дүйнөдөгү эң чоң аялдар университети. Аялдар үчүн толук гранттарды берет.",
      ru: "Крупнейший женский университет в мире. Предоставляет полные гранты для женщин.",
      en: "The largest women's university in the world. Provides full scholarships for women."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    slug: "princess-nora-university",
    ranking: "601-800",
    founded: "1970",
    students: "39,000+",
    faculties: 15,
    tags: ["Arts", "Health", "Social Science"]
  },
  {
    id: "qu",
    name: {
      uz: "Qassim Universiteti",
      kg: "Кассим университети",
      ru: "Университет Кассим",
      en: "Qassim University"
    },
    location: {
      uz: "Burayda, Saudiya Arabistoni",
      kg: "Бурайда, Сауд Арабиясы",
      ru: "Бурайда, Саудовская Аравия",
      en: "Buraydah, Saudi Arabia"
    },
    description: {
      uz: "Chet ellik talabalarni qo'llab-quvvatlovchi yetakchi davlat universitetlaridan biri.",
      kg: "Чет өлкөлүк студенттерди колдогон алдыңкы мамлекеттик университеттердин бири.",
      ru: "Один из ведущих государственных университетов, поддерживающих иностранных студентов.",
      en: "One of the leading public universities supporting international students."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800&q=80",
    slug: "qassim-university",
    ranking: "401-500",
    founded: "2004",
    students: "50,000+",
    faculties: 38,
    tags: ["Agriculture", "Law", "Computing"]
  },
  {
    id: "quoe",
    name: {
      uz: "Qatar Universiteti",
      kg: "Катар университети",
      ru: "Университет Катара",
      en: "Qatar University"
    },
    location: {
      uz: "Doxa, Qatar",
      kg: "Доха, Катар",
      ru: "Доха, Катар",
      en: "Doha, Qatar"
    },
    description: {
      uz: "Qatar davlatining asosiy universiteti. Xalqaro talabalar uchun grantlar mavjud.",
      kg: "Катар мамлекетинин негизги университети. Эл аралык студенттер үчүн гранттар бар.",
      ru: "Основной государственный университет Катара. Имеются гранты для иностранных студентов.",
      en: "The main public university of Qatar. Scholarships are available for international students."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    slug: "qatar-university",
    ranking: "173",
    founded: "1973",
    students: "23,000+",
    faculties: 10,
    tags: ["Business", "Education", "Law"]
  },
  {
    id: "uaeu",
    name: {
      uz: "BAA Universiteti",
      kg: "БАЭ университети",
      ru: "Университет ОАЭ",
      en: "UAE University"
    },
    location: {
      uz: "Al-Ayn, BAA",
      kg: "Аль-Айн, БАЭ",
      ru: "Аль-Айн, ОАЭ",
      en: "Al-Ain, UAE"
    },
    description: {
      uz: "BAAdagi eng qadimgi va nufuzli universitet. To'liq grantlar taqdim etiladi.",
      kg: "БАЭдеги эң эски жана абройлуу университет. Толук гранттар берилет.",
      ru: "Старейший и престижный университет в ОАЭ. Предоставляются полные гранты.",
      en: "The oldest and most prestigious university in the UAE. Full scholarships are offered."
    },
    logo: "/unvr/kau-logo.png",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    slug: "uae-university",
    ranking: "290",
    founded: "1976",
    students: "15,000+",
    faculties: 9,
    tags: ["Humanities", "IT", "Social Sciences"]
  }
];
