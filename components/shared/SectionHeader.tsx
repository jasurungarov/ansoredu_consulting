interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {badge && <span className="section-badge mb-4 inline-flex">{badge}</span>}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-gray-500 text-base ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
