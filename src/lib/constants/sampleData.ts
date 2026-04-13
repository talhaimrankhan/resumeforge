import type { ResumeFormData } from '../types'

export const SAMPLE_RESUME_DATA: ResumeFormData = {
  personalInfo: {
    fullName: 'Alexandra Mitchell',
    email: 'alex.mitchell@email.com',
    phone: '+1 (415) 555-0192',
    location: 'San Francisco, CA',
    website: 'alexmitchell.dev',
    linkedin: 'linkedin.com/in/alexmitchell',
    photoUrl: '',
  },
  summary:
    'Senior Software Engineer with 7+ years building scalable web applications at high-growth startups. Led teams of 6 engineers, shipped products used by 2M+ users, and reduced infrastructure costs by 40%. Passionate about clean architecture, developer experience, and mentoring.',
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Stripe',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description:
        '• Led migration of payment processing service to event-driven architecture, reducing latency by 35%\n• Mentored 4 junior engineers through bi-weekly 1:1s and structured code reviews\n• Built internal developer tooling adopted by 200+ engineers across 12 teams',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description:
        '• Rebuilt the search ranking pipeline in Go, improving result relevance by 22%\n• Collaborated with design and PM to ship 3 major product features to 150M+ users\n• Reduced CI build times by 60% through parallelisation and caching improvements',
    },
    {
      id: '3',
      title: 'Junior Developer',
      company: 'Atlassian',
      location: 'Sydney, Australia',
      startDate: '2017-01',
      endDate: '2018-05',
      current: false,
      description:
        '• Developed React components for Jira issue tracking UI used by 10M+ daily users\n• Fixed 40+ accessibility bugs, bringing WCAG compliance from 62% to 94%',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013-08',
      endDate: '2017-05',
      gpa: '3.87/4.0',
    },
  ],
  skills: [
    { id: '1', name: 'TypeScript', level: 'expert' },
    { id: '2', name: 'React', level: 'expert' },
    { id: '3', name: 'Node.js', level: 'expert' },
    { id: '4', name: 'Go', level: 'intermediate' },
    { id: '5', name: 'PostgreSQL', level: 'intermediate' },
    { id: '6', name: 'AWS', level: 'intermediate' },
    { id: '7', name: 'Docker', level: 'intermediate' },
    { id: '8', name: 'GraphQL', level: 'beginner' },
  ],
  extras: {
    certifications: [
      { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2022-09' },
      { id: '2', name: 'Google Cloud Professional', issuer: 'Google', date: '2023-03' },
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'native' },
      { id: '2', language: 'Spanish', proficiency: 'fluent' },
      { id: '3', language: 'French', proficiency: 'conversational' },
    ],
    hobbies: ['Rock Climbing', 'Photography', 'Open Source', 'Chess'],
    links: [
      { id: '1', label: 'GitHub', url: 'github.com/alexmitchell' },
      { id: '2', label: 'Portfolio', url: 'alexmitchell.dev' },
    ],
  },
}
