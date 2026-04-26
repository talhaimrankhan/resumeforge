import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const faqs = [
  {
    question: 'Is ResumeForge free to use?',
    answer: 'Yes — ResumeForge is completely free to start. Every tier (Spark, Ascend, and Prestige) includes 3 free templates you can use right away with no credit card required. Premium templates are available as one-time purchases starting at $4.99.',
  },
  {
    question: 'How do I make a resume with ResumeForge?',
    answer: 'Sign up for a free account, pick a template from our library of 30 designs, then follow the step-by-step guided wizard. You\'ll fill in your personal info, summary, work experience, education, and skills — then download your finished resume as a PDF or PNG in minutes.',
  },
  {
    question: 'Can I use ResumeForge as a CV maker?',
    answer: 'Absolutely. ResumeForge works equally well as a CV builder. Our Ascend and Prestige templates include sections for certifications, languages, and extra details that are standard in CVs. Simply fill in the fields that apply to your document type.',
  },
  {
    question: 'Are the resume templates ATS-friendly?',
    answer: 'Yes. All 30 templates in ResumeForge are designed to be ATS (Applicant Tracking System) compatible. We use clean, semantic layouts with proper heading structures so your resume parses correctly through automated screening software used by employers.',
  },
  {
    question: 'What file formats can I download my resume in?',
    answer: 'You can download your resume as a print-ready PDF or a high-resolution PNG image. Both export formats are pixel-perfect reproductions of your chosen template.',
  },
  {
    question: 'What is the difference between Spark, Ascend, and Prestige templates?',
    answer: 'Spark templates are clean single-column layouts ideal for fresh graduates and straightforward job applications. Ascend templates feature two-column professional designs with a certifications section — great for mid-level roles. Prestige templates are executive-grade layouts with full extras: certifications, languages, hobbies, and portfolio links.',
  },
  {
    question: 'Can I create multiple resumes?',
    answer: 'Yes. Your ResumeForge account lets you create and save as many resumes as you need. Each resume can use a different template and be tailored for a specific role or industry.',
  },
  {
    question: 'Do I need to pay a subscription to download my resume?',
    answer: 'No subscriptions, ever. ResumeForge uses a one-time payment model. Free templates are always free to download. When you choose to unlock a premium template, you pay once and it stays unlocked on your account forever.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-forge-50 text-forge-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              Got questions?
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-forge-900 tracking-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Everything you need to know about building your resume with ResumeForge.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all ${isOpen ? 'border-forge-200 bg-forge-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-forge-900">{faq.question}</span>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-forge-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <svg
                        className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
