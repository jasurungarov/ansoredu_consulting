"use client";
 
import {usePathname, useRouter} from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';import { Button } from '../ui/button'
import { Globe } from 'lucide-react'
const languages = [
  { code: "uz", label: "UZ", flag: "🇺🇿" },
  { code: "kg", label: "KG", flag: "🇰🇬" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "en", label: "EN", flag: "🇺🇸" },
];
 
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const params = useParams();
 
  const handleLanguageChange = (newLocale: string) => {
    router.replace(
      // @ts-expect-error -- pathname might not match perfectly with route params
      {pathname, params},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {locale: newLocale as any}
    );
  };
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-accent hover:text-accent-foreground">
          <Globe className="size-5 text-blue-700" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer gap-2 ${
              locale === lang.code ? 'bg-accent font-medium text-accent-foreground' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
