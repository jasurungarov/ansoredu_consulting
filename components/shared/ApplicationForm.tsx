"use client";

import { universitiesData } from "@/lib/universities-data";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2),
  interestedIn: z.string().min(1),
  nickName: z.string().optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ApplicationForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    interestedIn: "",
    nickName: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const validate = (): boolean => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((e) => {
        const field = e.path[0] as keyof FormData;
        fieldErrors[field] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        interestedIn: "",
        nickName: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-gray-900">{t("successTitle")}</h4>
        <p className="text-gray-500 text-sm max-w-xs">{t("successDesc")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 flex flex-row items-center gap-2 text-lg text-[#1B3A8C] underline underline-offset-2 hover:text-[#D4AF37] transition-colors">
          <IoMdArrowRoundBack size={20} />
          {t("back")}
        </button>
      </div>
    );
  }

  // ── Input class helpers ────────────────────────────────────────────────────
  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
     ${
       errors[field]
         ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
         : "border-gray-200 bg-gray-50 focus:border-[#1B3A8C] focus:ring-2 focus:ring-[#1B3A8C]/10 focus:bg-white"
     }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Row 1: Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("fullName")} <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder={t("placeholderName")}
            className={inputClass("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {t("errors.required", { ns: "errors" }) ?? errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("phone")} <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("placeholderPhone")}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {t("errors.invalidPhone", { ns: "errors" }) ?? errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email + City */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("email")}
            <span className="text-gray-400 text-xs ml-1">{t("optional")}</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("placeholderEmail")}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("city")} <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder={t("placeholderCity")}
            className={inputClass("city")}
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">
              {t("errors.city", { ns: "errors" }) ?? errors.city}
            </p>
          )}
        </div>
      </div>

      {/* University select and NickName */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("interestedIn")} <span className="text-red-500">*</span>
          </label>
          <select
            name="interestedIn"
            value={form.interestedIn}
            onChange={handleChange}
            className={inputClass("interestedIn")}>
            <option value="" disabled>
              {t("selectUniversity")}
            </option>
            {universitiesData.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name[locale as keyof typeof u.name]}
              </option>
            ))}
          </select>
          {errors.interestedIn && (
            <p className="text-red-500 text-xs mt-1">
              {t("errors.invalidUnvercity", { ns: "errors" }) ??
                errors.interestedIn}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("nickName")} <span className="text-red-500">*</span>
          </label>
          <input
            name="nickName"
            value={form.nickName}
            onChange={handleChange}
            placeholder={t("placeholdernickName")}
            className={inputClass("nickName")}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("message")}
          <span className="text-gray-400 text-xs ml-1">{t("optional")}</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder={t("placeholderMessage")}
          className={`${inputClass("message")} resize-none`}
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg
            className="w-4 h-4 text-red-500 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-red-600 text-sm">
            {t("errors.serverError", { ns: "errors" }) ??
              "Xatolik yuz berdi. Qayta urinib ko'ring."}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 px-6 rounded-xl bg-[#1B3A8C] hover:bg-[#0f2460] text-white font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#1B3A8C]/20 hover:shadow-[#1B3A8C]/30">
        {status === "loading" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
