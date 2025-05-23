import { en } from './en';
import { es } from './es';

export const i18n = {
  en,
  es
};

export type Language = 'en' | 'es';

export type TranslationKeys = typeof en;
