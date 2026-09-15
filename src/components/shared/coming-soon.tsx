import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Bell, ArrowRight, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function CountdownTimer() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: t("comingSoon.countdown.days"), value: timeLeft.days },
    { label: t("comingSoon.countdown.hours"), value: timeLeft.hours },
    { label: t("comingSoon.countdown.minutes"), value: timeLeft.minutes },
    { label: t("comingSoon.countdown.seconds"), value: timeLeft.seconds },
  ];

  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-3 sm:gap-4">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/10">
            <motion.span
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-mono text-2xl font-bold text-primary sm:text-3xl"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.span>
          </div>
          <span className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export interface ComingSoonFeature {
  icon: LucideIcon;
  label: string;
}

export interface ComingSoonProps {
  title: string;
  description: string;
  features?: ComingSoonFeature[];
  children?: ReactNode;
}

export default function ComingSoon({ title, description, features = [], children }: ComingSoonProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <div className="w-full max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("comingSoon.status")}
          </div>

          <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          )}

          <CountdownTimer />
        </div>
      </div>

      {children}

      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-4 flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t("comingSoon.notify.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("comingSoon.notify.subtitle")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {submitted ? (
              t("comingSoon.notify.submitted")
            ) : (
              <>
                {t("comingSoon.notify.button")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
