const u = (id: string, w = 1000): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export interface CasePhotoPair {
  before: string
  after: string
}

export const PHOTOS = {
  // Home
  heroMain: u('photo-1630827020718-3433092696e7', 1200),
  expTrim: u('photo-1517832606299-7ae9b720a186', 900),
  expResults: u('photo-1579034628318-b14c8ab399a9', 900),
  expTools: u('photo-1582750433449-648ed127bb54', 900),
  clinicTeam: u('photo-1769072610024-5b8a50f05c73', 1000),

  // About / Login
  story: u('photo-1503951914875-452162b0f3f1', 1000),
  loginHero: u('photo-1480455624313-e29b44bbfde1', 1200),

  doctors: [
    u('photo-1758691463582-11aea602cd4a', 700),
    u('photo-1637059824899-a441006a6875', 700),
    u('photo-1645066928295-2506defde470', 700),
    u('photo-1622253692010-333f2da6031d', 700),
  ] as const,

  gallery: [
    u('photo-1769072610024-5b8a50f05c73', 800),
    u('photo-1517832606299-7ae9b720a186', 800),
    u('photo-1625134673337-519d4d10b313', 800),
    u('photo-1672761431764-61b8d9a00dbb', 800),
  ] as const,

  // ملاحظة: صور توضيحية فقط. استبدلها بصور حالات حقيقية بموافقة المراجعين.
  cases: [
    { before: u('photo-1519058082700-08a0b56da9b4', 700), after: u('photo-1480455624313-e29b44bbfde1', 700) },
    { before: u('photo-1759346617233-9c57f44535fd', 700), after: u('photo-1656338997878-279d71d48f6e', 700) },
    { before: u('photo-1527082395-e939b847da0d', 700), after: u('photo-1607346256330-dee7af15f7c5', 700) },
    { before: u('photo-1599834562135-b6fc90e642ca', 700), after: u('photo-1523278669709-c05da80b6a65', 700) },
    { before: u('photo-1521572267360-ee0c2909d518', 700), after: u('photo-1672761431764-61b8d9a00dbb', 700) },
    { before: u('photo-1591425455205-c238fc7e4230', 700), after: u('photo-1589588940915-31a548ab346a', 700) },
  ] as const,
}