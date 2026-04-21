"use client";
 
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";
import { universitiesData } from '@/lib/universities-data'
 
interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  interestedIn: string;
  message?: string;
}
 
export default function ApplicationForm() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const te = useTranslations('errors');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    interestedIn: "KAU",
    message: "",
  });
 
  const validate = (data: ApplicationFormData) => {
    const errs: Partial<Record<keyof ApplicationFormData, string>> = {};
    if (!data.fullName || data.fullName.trim().length < 2) {
      errs.fullName = te('minLength', {min: 2});
    }
    if (!data.phone || !/^\+?[\d\s\-()]{7,15}$/.test(data.phone)) {
      errs.phone = te('invalidPhone');
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = te('invalidEmail');
    }
    if (!data.city || data.city.trim().length < 2) {
      errs.city = te('required');
    }
    return errs;
  };
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ApplicationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
 
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
 
      if (!res.ok) throw new Error("Server error");
      setIsSuccess(true);
    } catch {
      setErrors({ fullName: te('serverError') });
    } finally {
      setIsSubmitting(false);
    }
  };
 
  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('successTitle')}
        </h3>
        <p className="text-gray-500">{t('successDesc')}</p>
      </div>
    );
  }
 
 
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('fullName')} <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t('placeholderName')}
          className={cn(
            "input-field",
            errors.fullName && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
          )}
          autoComplete="name"
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
      </div>
 
      {/* Phone + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('placeholderPhone')}
            className={cn(
              "input-field",
              errors.phone && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            )}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('placeholderEmail')}
            className={cn(
              "input-field",
              errors.email && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            )}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>
 
      {/* City + University */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('city')} <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder={t('placeholderCity')}
            className={cn(
              "input-field",
              errors.city && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            )}
          />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="interestedIn" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('interestedIn')} <span className="text-red-500">*</span>
          </label>
          <select
            id="interestedIn"
            name="interestedIn"
            value={formData.interestedIn}
            onChange={handleChange}
            className={cn(
              "input-field",
              errors.interestedIn && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            )}
          >
            {universitiesData.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name[locale as keyof typeof u.name]}
              </option>
            ))}
          </select>
        </div>
      </div>
 
      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('placeholderMessage')}
          className="input-field resize-none"
        />
      </div>
 
      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            {t('submitting')}
          </span>
        ) : (
          t('submit')
        )}
      </button>
    </form>
  );
}
