// ─── Database Row Types ───────────────────────────────────────────────────────

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Resume {
  id: string
  user_id: string
  title: string
  template_id: string
  form_data: ResumeFormData
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  is_free: boolean
  price: number
  thumbnail_color: string
}

export interface UnlockedTemplate {
  id: string
  user_id: string
  template_id: string
  unlocked_at: string
}

// ─── Domain Types ─────────────────────────────────────────────────────────────

export type TemplateCategory = 'spark' | 'ascend' | 'prestige'

export type SkillLevel = 'beginner' | 'intermediate' | 'expert'
export type LanguageProficiency = 'basic' | 'conversational' | 'fluent' | 'native'

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  photoUrl: string
}

export interface ExperienceEntry {
  id: string
  company: string
  title: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
}

export interface SkillEntry {
  id: string
  name: string
  level: SkillLevel
}

export interface CertificationEntry {
  id: string
  name: string
  issuer: string
  date: string
}

export interface LanguageEntry {
  id: string
  language: string
  proficiency: LanguageProficiency
}

export interface LinkEntry {
  id: string
  label: string
  url: string
}

export interface ExtrasData {
  certifications: CertificationEntry[]
  languages: LanguageEntry[]
  hobbies: string[]
  links: LinkEntry[]
}

export interface ResumeFormData {
  personalInfo: PersonalInfo
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: SkillEntry[]
  extras: ExtrasData
}

export const EMPTY_FORM_DATA: ResumeFormData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    photoUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  extras: {
    certifications: [],
    languages: [],
    hobbies: [],
    links: [],
  },
}

// ─── Editor Types ─────────────────────────────────────────────────────────────

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface WizardStepConfig {
  step: WizardStep
  label: string
  description: string
}
