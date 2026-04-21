import LegalPage from '@/components/LegalPage'
import type { LocaleKey } from '@/locales/en'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Celestial Tech',
  description:
    'Celestial Tech terms of service. Read the terms governing your use of our AI SOC, cybersecurity, and automation services.',
}

const sections: { titleKey: LocaleKey; contentKey: LocaleKey }[] = [
  {
    titleKey: 'terms_1_title',
    contentKey: 'terms_1_content',
  },
  {
    titleKey: 'terms_2_title',
    contentKey: 'terms_2_content',
  },
  {
    titleKey: 'terms_3_title',
    contentKey: 'terms_3_content',
  },
  {
    titleKey: 'terms_4_title',
    contentKey: 'terms_4_content',
  },
  {
    titleKey: 'terms_5_title',
    contentKey: 'terms_5_content',
  },
  {
    titleKey: 'terms_6_title',
    contentKey: 'terms_6_content',
  },
  {
    titleKey: 'terms_7_title',
    contentKey: 'terms_7_content',
  },
  {
    titleKey: 'terms_8_title',
    contentKey: 'terms_8_content',
  },
]

export default function TermsOfService() {
  return (
    <LegalPage
      titleKey="terms_title"
      subtitleKey="terms_subtitle"
      lastUpdatedKey="terms_last_updated"
      sections={sections}
    />
  )
}
