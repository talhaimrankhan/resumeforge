// Shared types and utilities for resume templates
import type { ResumeFormData, ExperienceEntry, SkillEntry, CertificationEntry, LanguageEntry } from '../../lib/types'

export type { ResumeFormData }

export function formatDateRange(start: string, end: string, current: boolean): string {
  if (!start) return ''
  const fmt = (d: string) => {
    if (!d) return 'Present'
    const [year, month] = d.split('-')
    if (!month) return year
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }
  return `${fmt(start)} — ${current ? 'Present' : fmt(end)}`
}

// ── Spark layout: single-column, clean ───────────────────────────────────────
interface SparkConfig {
  accent: string       // hex color for name, section headers, dividers
  accentLight: string  // light tint for section header bg
  font: string         // Tailwind font classes
}

export function SparkLayout({ data, cfg }: { data: ResumeFormData; cfg: SparkConfig }) {
  const { personalInfo: p, summary, experience, education, skills } = data
  return (
    <div
      id="resume-preview"
      className={`bg-white w-full min-h-[297mm] p-10 ${cfg.font}`}
      style={{ fontFamily: 'inherit' }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1" style={{ color: cfg.accent }}>
          {p.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <a href={p.website} className="hover:underline" style={{ color: cfg.accent }}>{p.website}</a>}
          {p.linkedin && <a href={p.linkedin} className="hover:underline" style={{ color: cfg.accent }}>{p.linkedin}</a>}
        </div>
        <div className="mt-3 h-0.5 rounded" style={{ background: cfg.accent }} />
      </div>

      {/* Summary */}
      {summary && (
        <Section label="Summary" accent={cfg.accent} accentLight={cfg.accentLight}>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section label="Experience" accent={cfg.accent} accentLight={cfg.accentLight}>
          {experience.map(exp => <ExpBlock key={exp.id} exp={exp} accent={cfg.accent} />)}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section label="Education" accent={cfg.accent} accentLight={cfg.accentLight}>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                  <div className="text-sm text-gray-600">{edu.institution}</div>
                </div>
                <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
                  {formatDateRange(edu.startDate, edu.endDate, false)}
                </span>
              </div>
              {edu.gpa && <div className="text-xs text-gray-400 mt-0.5">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section label="Skills" accent={cfg.accent} accentLight={cfg.accentLight}>
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '32px', rowGap: '0px' }}>
            {skills.map(s => <SkillItem key={s.id} skill={s} accent={cfg.accent} />)}
          </div>
        </Section>
      )}
    </div>
  )
}

// ── Ascend layout: two-column with left sidebar ───────────────────────────────
interface AscendConfig {
  sidebarBg: string    // CSS color for sidebar
  accentText: string   // for section headers in main
  accentSide: string   // for sidebar section headers
  font: string
}

export function AscendLayout({ data, cfg }: { data: ResumeFormData; cfg: AscendConfig }) {
  const { personalInfo: p, summary, experience, education, skills, extras } = data
  return (
    <div
      id="resume-preview"
      className={`bg-white w-full min-h-[297mm] flex ${cfg.font}`}
    >
      {/* Sidebar */}
      <div className="w-[38%] min-h-full p-8 text-white" style={{ background: cfg.sidebarBg }}>
        {/* Photo placeholder */}
        {p.photoUrl ? (
          <img src={p.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/30" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 text-3xl font-bold">
            {p.fullName ? p.fullName[0] : '?'}
          </div>
        )}
        <h1 className="text-xl font-extrabold leading-tight mb-1 text-white">{p.fullName || 'Your Name'}</h1>

        {/* Contact */}
        <div className="mb-5">
          <SideSection label="Contact" color={cfg.accentSide}>
            {p.email && <SideItem icon="✉" text={p.email} />}
            {p.phone && <SideItem icon="☎" text={p.phone} />}
            {p.location && <SideItem icon="📍" text={p.location} />}
            {p.website && <SideItem icon="🌐" text={p.website} />}
            {p.linkedin && <SideItem icon="in" text={p.linkedin} />}
          </SideSection>
        </div>

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <SideSection label="Skills" color={cfg.accentSide}>
            {skills.map(s => (
              <div key={s.id} className="mb-1.5">
                <div className="text-xs text-white/80 mb-0.5">{s.name}</div>
                <div className="h-1 bg-white/20 rounded-full">
                  <div
                    className="h-1 rounded-full bg-white/70"
                    style={{ width: s.level === 'expert' ? '90%' : s.level === 'intermediate' ? '65%' : '35%' }}
                  />
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {/* Certifications (Ascend) */}
        {extras?.certifications && extras.certifications.length > 0 && (
          <SideSection label="Certifications" color={cfg.accentSide}>
            {extras.certifications.map((c: CertificationEntry) => (
              <div key={c.id} className="mb-2">
                <div className="text-xs font-semibold text-white/90">{c.name}</div>
                <div className="text-xs text-white/60">{c.issuer}{c.date && ` · ${c.date}`}</div>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {summary && (
          <MainSection label="Summary" accent={cfg.accentText}>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </MainSection>
        )}
        {experience.length > 0 && (
          <MainSection label="Experience" accent={cfg.accentText}>
            {experience.map(exp => <ExpBlock key={exp.id} exp={exp} accent={cfg.accentText} />)}
          </MainSection>
        )}
        {education.length > 0 && (
          <MainSection label="Education" accent={cfg.accentText}>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                    <div className="text-sm text-gray-500">{edu.institution}</div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                </div>
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  )
}

// ── Prestige layout: sophisticated header + grid body ─────────────────────────
interface PrestigeConfig {
  headerBg: string
  accentText: string
  dividerColor: string
  font: string
}

export function PrestigeLayout({ data, cfg }: { data: ResumeFormData; cfg: PrestigeConfig }) {
  const { personalInfo: p, summary, experience, education, skills, extras } = data
  return (
    <div id="resume-preview" className={`bg-white w-full min-h-[297mm] ${cfg.font}`}>
      {/* Executive header */}
      <div className="p-8 pb-6" style={{ background: cfg.headerBg }}>
        <div className="flex items-center gap-5">
          {p.photoUrl ? (
            <img src={p.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white/40" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white">
              {p.fullName ? p.fullName[0] : '?'}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              {p.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/70">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
              {p.website && <span>{p.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {summary && (
          <div className="mb-6">
            <PHeader label="Professional Summary" accent={cfg.accentText} divider={cfg.dividerColor} />
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Two-column grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left (2/3) */}
          <div className="col-span-2 space-y-5">
            {experience.length > 0 && (
              <div>
                <PHeader label="Experience" accent={cfg.accentText} divider={cfg.dividerColor} />
                {experience.map(exp => <ExpBlock key={exp.id} exp={exp} accent={cfg.accentText} />)}
              </div>
            )}
            {education.length > 0 && (
              <div>
                <PHeader label="Education" accent={cfg.accentText} divider={cfg.dividerColor} />
                {education.map(edu => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                        <div className="text-sm text-gray-500">{edu.institution}</div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right (1/3) */}
          <div className="space-y-5">
            {skills.length > 0 && (
              <div>
                <PHeader label="Skills" accent={cfg.accentText} divider={cfg.dividerColor} />
                <div>
                  {skills.map(s => <SkillItem key={s.id} skill={s} accent={cfg.accentText} />)}
                </div>
              </div>
            )}
            {extras?.certifications && extras.certifications.length > 0 && (
              <div>
                <PHeader label="Certifications" accent={cfg.accentText} divider={cfg.dividerColor} />
                {extras.certifications.map((c: CertificationEntry) => (
                  <div key={c.id} className="mb-2">
                    <div className="text-xs font-semibold text-gray-800">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.issuer}{c.date && ` · ${c.date}`}</div>
                  </div>
                ))}
              </div>
            )}
            {extras?.languages && extras.languages.length > 0 && (
              <div>
                <PHeader label="Languages" accent={cfg.accentText} divider={cfg.dividerColor} />
                {extras.languages.map((l: LanguageEntry) => (
                  <div key={l.id} className="flex justify-between text-xs mb-1">
                    <span className="text-gray-800 font-medium">{l.language}</span>
                    <span className="text-gray-400 capitalize">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
            {extras?.hobbies && extras.hobbies.length > 0 && (
              <div>
                <PHeader label="Hobbies" accent={cfg.accentText} divider={cfg.dividerColor} />
                <div className="flex flex-wrap gap-1.5">
                  {extras.hobbies.map((h, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">{h}</span>
                  ))}
                </div>
              </div>
            )}
            {extras?.links && extras.links.length > 0 && (
              <div>
                <PHeader label="Portfolio" accent={cfg.accentText} divider={cfg.dividerColor} />
                {extras.links.map(l => (
                  <div key={l.id} className="mb-1">
                    <div className="text-xs font-semibold text-gray-800">{l.label}</div>
                    <a href={l.url} className="text-xs break-all" style={{ color: cfg.accentText }}>{l.url}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ label, accent, accentLight, children }: { label: string; accent: string; accentLight: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>{label}</h2>
        <div className="flex-1 h-px" style={{ background: accentLight }} />
      </div>
      {children}
    </div>
  )
}

function SideSection({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color }}>{label}</div>
      <div className="h-px bg-white/20 mb-2" />
      {children}
    </div>
  )
}

function SideItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2 mb-1.5">
      <span className="text-xs text-white/50 mt-0.5 w-4 flex-shrink-0">{icon}</span>
      <span className="text-xs text-white/80 break-all">{text}</span>
    </div>
  )
}

function MainSection({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>{label}</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </div>
  )
}

function PHeader({ label, accent, divider }: { label: string; accent: string; divider: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>{label}</h2>
      <div className="h-0.5 rounded mt-1" style={{ background: divider }} />
    </div>
  )
}

function ExpBlock({ exp, accent }: { exp: ExperienceEntry; accent: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-bold text-sm" style={{ color: accent }}>{exp.title}</span>
          <span className="text-gray-400 text-sm"> · {exp.company}</span>
          {exp.location && <span className="text-gray-400 text-xs"> · {exp.location}</span>}
        </div>
        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
          {formatDateRange(exp.startDate, exp.endDate, exp.current)}
        </span>
      </div>
      {exp.description && (
        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed whitespace-pre-line">{exp.description}</p>
      )}
    </div>
  )
}


function SkillItem({ skill, accent }: { skill: SkillEntry; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexShrink: 0 }}>
      <div style={{
        width: '7px',
        height: '7px',
        borderRadius: '2px',
        background: accent,
        flexShrink: 0,
        marginTop: '1px',
      }} />
      <span style={{
        fontSize: '12px',
        color: '#374151',
        fontWeight: 500,
        lineHeight: '1.4',
      }}>
        {skill.name}
      </span>
    </div>
  )
}
