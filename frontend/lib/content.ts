const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const defaults: Record<string, string> = {
  hero_title:    'Protecting Families, Preserving Dignity',
  hero_subtitle: 'Mbelee Maisha supports members through medical emergencies, last expense coverage, and children\'s education savings — ensuring every family faces unforeseen events with strength and dignity.',
  cta_text:      'Become a Member',
  mission:       'To support members and beneficiaries in footing medical bills and funeral expenses while maintaining dignity.',
  vision:        'To become a premier welfare services provider and employer of many unemployed women and youth across Kenya.',
  story:         'Mbelee Maisha Welfare Organization was founded with a clear purpose: to provide a safety net for families during their most vulnerable moments. We recognized that medical emergencies and the loss of loved ones can financially devastate families, leaving them unable to maintain their dignity.',
  medical_desc:  'Mbelee Maisha pays hospital bills when a member is admitted in public and mission hospitals. We ensure you focus on recovery, not bills.',
  funeral_desc:  'In times of grief, Mbelee Maisha offers last respect services to members and their beneficiaries — covering everything from the coffin to transport, so families can focus on healing.',
  education_desc:'A voluntary savings plan targeting Grade 1 through Grade 4, making early education affordable and stress-free.',
  reg_fee:       '200',
  paybill:       '247247',
  account:       '529152',
  requirements:  'Must be 18 years and above\nMust be of good character and sound mind\nMust fill and sign the application form\nMust pay KSH 200 registration fee\nMust be able to pay monthly contributions',
  phone:         '0140-166773',
  email:         'info@mbeleemaisha.com',
  address:       'P.O Box 68 Siaya, Awello Junction along Siaya Kadenge Road',
  hours:         'Monday - Friday: 8:00AM - 5:00PM\nWeekends: On call support',
}

export async function getSiteContent(): Promise<Record<string, string>> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(`${API_URL}/api/content`, {
      signal: controller.signal,
      cache: 'no-store',
    })

    clearTimeout(timeout)
    if (!res.ok) return defaults

    const data = await res.json()
    return { ...defaults, ...data }
  } catch {
    return defaults
  }
}
