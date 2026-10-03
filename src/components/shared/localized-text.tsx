"use client";

import { useLanguage, type TranslationKey } from "@/lib/i18n";

interface LocalizedTextProps {
    translationKey: TranslationKey;
    params?: Record<string, string | number>;
}

export default function LocalizedText({ translationKey, params }: LocalizedTextProps) {
    const { t } = useLanguage();

    return <>{t(translationKey, params)}</>;
}
