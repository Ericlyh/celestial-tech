import LegalPage from '@/components/LegalPage'
import type { LocaleKey } from '@/locales/en'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Celestial Tech — AI Employees That Speak Cantonese',
  description:
    'Celestial Tech privacy policy. Learn how we collect, use, and protect your data when you use our AI SOC and cybersecurity services.',
}

const sections: { titleKey: LocaleKey; contentKey: LocaleKey }[] = [
  {
    titleKey: 'privacy_1_title',
    contentKey: 'privacy_1_content',
  },
  {
    titleKey: 'privacy_2_title',
    contentKey: 'privacy_2_content',
  },
  {
    titleKey: 'privacy_3_title',
    contentKey: 'privacy_3_content',
  },
  {
    titleKey: 'privacy_4_title',
    contentKey: 'privacy_4_content',
  },
  {
    titleKey: 'privacy_5_title',
    contentKey: 'privacy_5_content',
  },
  {
    titleKey: 'privacy_6_title',
    contentKey: 'privacy_6_content',
  },
  {
    titleKey: 'privacy_7_title',
    contentKey: 'privacy_7_content',
  },
  {
    titleKey: 'privacy_8_title',
    contentKey: 'privacy_8_content',
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalPage
      titleKey="privacy_title"
      subtitleKey="privacy_subtitle"
      lastUpdatedKey="privacy_last_updated"
      sections={sections}
    />
  )
}
