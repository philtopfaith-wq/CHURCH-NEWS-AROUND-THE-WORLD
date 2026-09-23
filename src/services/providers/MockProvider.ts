import { Article, ProviderResult } from '../../types';
import { MOCK_PROVIDER_CONFIG } from '../../config/providers';

/**
 * Mock Provider for development, testing, and offline fallback.
 * Strictly labeled with `isMock: true` and distinctive demo attribution.
 */
export const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-world-01',
    title: 'Ecumenical Relief Convoy Reaches Remote Mountain Parishes in Central Highlands',
    summary: 'A coalition of Catholic, Orthodox, and Protestant agencies delivered winter provisions, medical diagnostics, and clean water filtration systems to eighteen isolated communities.',
    contentHtml: `<p>A coordinated relief effort bringing together three major ecclesiastical relief agencies completed its two-week mission across the central highlands this morning. The initiative, code-named Project Mercy Corridor, distributed over forty metric tons of supplies including specialized winter garments, shelf-stable flour, pediatric medications, and portable solar water purifiers.</p>
    <p>Pastoral teams from Catholic Caritas, International Orthodox Christian Charities, and World Relief worked in tandem with regional presbyteries to coordinate logistics through adverse mountain passes.</p>
    <blockquote>"When hunger and freezing temperatures arrive at these mountain passes, theological distinctions vanish before the urgent imperative of Christian hospitality," noted Bishop Marcus Vance, pastoral coordinator for the relief coalition.</blockquote>
    <p>Local community halls and cathedral undercrofts were transformed into receiving centers. Volunteer medical practitioners examined more than 1,200 villagers, identifying early cases of respiratory illness and administering protective vaccines.</p>
    <p>The coalition plans to establish permanent winter emergency supply caches in six anchor parishes before the next seasonal snowstorms close high-elevation roads.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/ecumenical-mountain-relief-2026',
    category: 'Missions',
    publishedAt: '2026-09-22T14:30:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Eleanor Vance, Humanitarian Correspondent',
    tags: ['Missions', 'Relief', 'Ecumenical', 'Highlands', 'Aid'],
    readTimeMinutes: 4,
    isMock: true,
    isFeatured: true,
  },
  {
    id: 'mock-church-02',
    title: 'Global Synod of Bishops Concludes Session with Call for Parish Decentralization',
    summary: 'The final synodal document urges regional dioceses to grant greater financial transparency and pastoral decision-making authority to lay parish councils.',
    contentHtml: `<p>Delegates at the conclusion of the fourth plenary assembly endorsed an eighty-page summary text emphasizing shared governance and accountability at the parish level. The document, which passed with broad consensus among both clerical and lay participants, establishes concrete guidelines for diocesan financial reporting.</p>
    <p>Among the key recommendations is the mandatory establishment of independent lay audit committees in every parish with annual operating revenues exceeding regional thresholds.</p>
    <blockquote>"The health of the global body is inseparable from the vitality and trustworthiness of the neighborhood altar," the drafting committee declared in its preamble.</blockquote>
    <p>Implementation frameworks are scheduled to be published by regional episcopal conferences over the coming six months, with pilot programs launching in twenty-four dioceses across four continents.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/global-synod-parish-councils',
    category: 'Church News',
    publishedAt: '2026-09-21T09:15:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Rev. Dr. Julian Thorne, Ecclesiastical Affairs',
    tags: ['Synod', 'Governance', 'Parish', 'Leadership', 'Transparency'],
    readTimeMinutes: 5,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-worship-03',
    title: 'Renaissance Polyphony Revitalizes Choral Traditions Across Cathedral Foundations',
    summary: 'Music directors report a dramatic resurgence of youthful choristers training in Renaissance counterpoint, Tudor anthems, and early sacred choral compositions.',
    contentHtml: `<p>Across major cathedral choirs, an unexpected demographic shift is breathing fresh life into ancient choral traditions. Enrolment in youth audition masterclasses has doubled over the past academic year, driven by a deep appreciation for the contemplative stillness of Byrd, Tallis, and Victoria.</p>
    <p>Dr. Miriam Hawthorne, master of music at St. Dunstan’s Cathedral, attributes this renewed interest to a cultural desire for sacred acoustic transcendence in an era of digital fragmentation.</p>
    <blockquote>"When forty young voices weave the complex eight-part polyphony of Thomas Tallis in a vaulted stone nave, time seems to stand still. It offers a sonic refuge that young people find deeply spiritual and intellectually arresting," she remarked.</blockquote>
    <p>A new inter-diocesan choral foundation has been endowed to provide full vocal scholarships for low-income choristers, ensuring the tradition remains accessible to all communities.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/renaissance-polyphony-cathedrals',
    category: 'Worship',
    publishedAt: '2026-09-20T16:45:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Sebastian Albright, Sacred Arts Review',
    tags: ['Worship', 'Sacred Music', 'Choral', 'Liturgy', 'Youth'],
    readTimeMinutes: 4,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-local-04',
    title: 'Historic Brick Parish Transforms Disused Rectory into Community Agro-Hub',
    summary: 'A 140-year-old downtown parish has partnered with urban horticulturists to produce three tons of fresh organic vegetables annually for local neighborhood food programs.',
    contentHtml: `<p>Grace Memorial Church, a venerable red-brick sanctuary constructed in 1886, consecrated a transformed one-acre parcel on Sunday that formerly sat as an overgrown lawn and storage barn. Today, the space houses passive-solar greenhouses, raised permaculture beds, and a community teaching kitchen.</p>
    <p>The urban agro-hub is managed jointly by parish volunteers and neighborhood high school apprentices, supplying fresh greens, tomatoes, and root crops directly to two community soup kitchens and a weekly sliding-scale farm stand.</p>
    <p>"Our forebears built this parish to be a lighthouse for the working families of this city," said the Rev. Clara Bennett. "In the twenty-first century, that light looks like nutrient-dense soil, fresh produce, and dignity for every neighbor who walks through our gates."</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/downtown-parish-agro-hub',
    category: 'Local Church',
    publishedAt: '2026-09-20T11:00:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Hannah Morales, Urban Ministry Desk',
    tags: ['Local Church', 'Community', 'Agriculture', 'Urban Ministry', 'Outreach'],
    readTimeMinutes: 3,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-leadership-05',
    title: 'Ecological Ethics & Pastoral Formation: Theological Seminaries Update Core Curriculum',
    summary: 'Seven historic theological faculties adopt integrated environmental stewardship and resource ethics into required master of divinity degree pathways.',
    contentHtml: `<p>Beginning with the forthcoming academic term, ministerial candidates at a consortium of seven theological seminaries will complete mandatory coursework examining biblical theology of creation care, carbon accounting for church properties, and environmental justice in vulnerable communities.</p>
    <p>The initiative, funded by a dedicated educational trust, pairs rigorous scriptural exegesis with practical facility stewardship, teaching future pastors how to oversee energy transitions for aging church facilities.</p>
    <p>"Ministers entering parish service today face congregations navigating climatic disruption, agricultural hardship, and moral questions about stewardship," explained Academic Dean Dr. Robert Kincaid. "We must equip them with theological depth and practical wisdom."</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/seminary-ecological-ethics-curriculum',
    category: 'Leadership',
    publishedAt: '2026-09-19T13:20:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Prof. David C. Stern, Theological Education',
    tags: ['Leadership', 'Seminary', 'Theology', 'Creation Care', 'Ethics'],
    readTimeMinutes: 4,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-conferences-06',
    title: 'International Forum on Christian Ethics in Computational Intelligence Convenes in Geneva',
    summary: 'Theologians, philosophers, and software engineers gather to formulate pastoral guidelines on human dignity, algorithmic bias, and autonomous systems.',
    contentHtml: `<p>More than three hundred scholars representing fifteen Christian traditions convened at the Ecumenical Centre in Geneva this week for the opening sessions of the International Consultation on Faith and Computational Ethics.</p>
    <p>Working groups are focusing on three primary domains: the ethical parameters of automated clinical decisions, the preservation of contemplative human agency, and pastoral care in increasingly virtualized communities.</p>
    <blockquote>"The fundamental Christian confession affirms the indelible image of God in every human person. Any technological system that reduces human relationality to mechanical utility warrants searching theological scrutiny," stated Dr. Aiko Tanaka in her opening keynote.</blockquote>
    <p>A joint declaration summarizing thirty practical recommendations for faith communities and technologists will be issued at the conclusion of the summit.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/geneva-ethics-computational-intelligence',
    category: 'Conferences',
    publishedAt: '2026-09-18T10:00:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Lars Lindqvist, European Bureau',
    tags: ['Conferences', 'Ethics', 'Technology', 'Geneva', 'Ecumenical'],
    readTimeMinutes: 4,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-ministries-07',
    title: 'Collegiate Campus Ministries Report Surge in Student-Led Morning Prayer Gatherings',
    summary: 'At eighteen university campuses, early morning liturgical prayer services have seen record attendance among undergraduate students seeking peace amidst academic stress.',
    contentHtml: `<p>Campus chaplains across several major state universities are noting an organic movement toward disciplined contemplative prayer. Unadvertised 7:00 AM services of Morning Prayer—featuring spoken psalms, silent reflection, and common petitions—are routinely filling collegiate chapel pews.</p>
    <p>Student organizers emphasize that the unhurried, unplugged nature of the services provides essential mental grounding before lectures and laboratory assignments begin.</p>
    <p>"In a world dominated by constant notifications and academic competition, spending twenty minutes in silence and sacred psalmody reminds me of who I am before God," shared Maya Chen, a junior biochemistry major at Midwestern State.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/collegiate-morning-prayer-resurgence',
    category: 'Ministries',
    publishedAt: '2026-09-17T08:30:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Rachel Thorne, Youth & Campus Ministries',
    tags: ['Ministries', 'Campus', 'Prayer', 'Youth', 'Spiritual Life'],
    readTimeMinutes: 3,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-culture-08',
    title: 'Rare Fifteenth-Century Illuminated Psalter Restored and Exhibited to the Public',
    summary: 'Conservators complete a meticulous five-year restoration of the Benedictine Codex, revealing vibrant lapis lazuli pigments and gold-leaf sacred calligraphy.',
    contentHtml: `<p>After half a decade of painstaking micro-chemical stabilization and leaf realignment, the celebrated Benedictine Psalter of St. Gall has gone on public display at the National Manuscript Library. The manuscript, produced circa 1435, contains 150 psalms accompanied by seventy-two full-page illuminations.</p>
    <p>Senior conservator Beatrice Fontaine explained that advanced non-destructive spectral analysis allowed her team to identify the exact mineral compositions used by the medieval monastic illuminators, including lapis mined in ancient Badakhshan.</p>
    <p>High-resolution digital scans have been released under an open educational license, enabling scholars, iconographers, and calligraphy students worldwide to examine the work down to the parchment fiber level.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/fifteenth-century-psalter-restored',
    category: 'Faith & Culture',
    publishedAt: '2026-09-16T15:00:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Charles D’Souza, Arts & Heritage',
    tags: ['Faith & Culture', 'Manuscripts', 'Art', 'History', 'Sacred Heritage'],
    readTimeMinutes: 4,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-world-09',
    title: 'Sub-Saharan Pastoral Health Network Expands Maternal Clinics in Rural Provinces',
    summary: 'A cross-denominational medical network marks the opening of its fiftieth clinical health outpost, significantly reducing infant and maternal mortality.',
    contentHtml: `<p>The Christian Health Association of West Africa marked a historic milestone on Tuesday with the dedication of its fiftieth rural maternal care clinic in the Savanes region. Supported by parish twinnings across Europe and North America, the clinics provide prenatal checkups, emergency obstetric care, and clean water delivery kits.</p>
    <p>Regional health authorities reported that districts served by the network have seen a 42% decrease in maternal complications over the preceding four-year evaluation cycle.</p>
    <p>"When a mother is cared for safely through childbirth, an entire village is sustained," remarked Dr. Amara Diallo, medical superintendent for the regional health federation.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/west-africa-maternal-health-network',
    category: 'World Church',
    publishedAt: '2026-09-15T12:00:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Kwame Mensah, Global Health Bureau',
    tags: ['World Church', 'Health', 'Africa', 'Missions', 'Maternal Care'],
    readTimeMinutes: 4,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-community-10',
    title: 'Interfaith Coalition in Rust Belt City Retires $4.2M in Medical Debt for Working Families',
    summary: 'Forty congregations pool contributions to abolish overdue hospital balances for over three thousand low-income households without conditions.',
    contentHtml: `<p>In an extraordinary display of civic solidarity, forty churches, synagogues, and regional fellowships across the Mahoning Valley announced the complete eradication of $4.2 million in defaulted medical debt. The coalition partnered with a national non-profit that purchases secondary debt portfolios for pennies on the dollar.</p>
    <p>Recipients of the relief letters will receive notification with no strings attached, relieving families of harassing collection calls and restoring impaired credit scores.</p>
    <p>"Our faith traditions teach us that Jubilee is not merely an ancient metaphor; it is an active economic intervention to restore freedom to our neighbors," said Pastor Michael Henderson.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/rust-belt-medical-debt-jubilee',
    category: 'Community',
    publishedAt: '2026-09-14T17:15:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Terrence Walsh, Community Justice Desk',
    tags: ['Community', 'Jubilee', 'Debt Relief', 'Charity', 'Justice'],
    readTimeMinutes: 3,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-christian-11',
    title: 'International Religious Freedom Commission Releases Annual Global Watchlist',
    summary: 'The comprehensive survey documents legal protections, emerging persecutions, and inter-religious peacemaking breakthroughs across eighty-four nations.',
    contentHtml: `<p>The International Religious Freedom Watch published its 2026 global survey on Monday, providing granular documentation on the legal status of religious minorities worldwide. While expressing deep alarm over intensified state censorship and property seizures in several authoritarian regimes, the report also highlighted significant legal triumphs.</p>
    <p>In three Southeast Asian nations, parliamentary reforms formally repealed colonial-era blasphemy statutes that had historically been weaponized against minority Christian and Muslim communities.</p>
    <p>The commission called for continued international diplomatic pressure and targeted humanitarian protections for peaceful religious adherents everywhere.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/religious-freedom-annual-report-2026',
    category: 'Christian News',
    publishedAt: '2026-09-13T10:45:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Helena Berg, Human Rights Correspondent',
    tags: ['Christian News', 'Religious Freedom', 'Human Rights', 'Global Watch'],
    readTimeMinutes: 5,
    isMock: true,
    isFeatured: false,
  },
  {
    id: 'mock-events-12',
    title: 'Commemorative Pilgrimage Marks 800th Anniversary of St. Francis of Assisi Canticle',
    summary: 'Thousands of pilgrims walk the historical mountain trails of Umbria in commemoration of the beloved hymn of creation, celebrating brotherhood and stewardship.',
    contentHtml: `<p>Pilgrims from thirty-eight countries have converged along the winding stone paths between Rieti, Fonte Colombo, and Assisi to commemorate the octocentenary of St. Francis’s Canticle of Brother Sun. The pilgrimage route features communal liturgical stations, musical performances of early Franciscan cantatas, and ecological seminars.</p>
    <p>The event concluded with an open-air twilight vigil in the square before the Basilica of San Francesco, illuminated by thousands of beeswax tapers held by pilgrims of all generations.</p>`,
    sourceName: 'Ecclesia Archival Wire',
    sourceUrl: 'https://ecclesianews.internal',
    articleUrl: 'https://ecclesianews.internal/archive/800th-anniversary-franciscan-canticle',
    category: 'Events',
    publishedAt: '2026-09-12T19:00:00.000Z',
    fetchedAt: '2026-09-23T07:00:00.000Z',
    author: 'Giuseppe Moretti, Italian Correspondent',
    tags: ['Events', 'Pilgrimage', 'Franciscan', 'Heritage', 'Assisi'],
    readTimeMinutes: 3,
    isMock: true,
    isFeatured: false,
  }
];

export class MockProvider {
  public async fetchArticles(): Promise<ProviderResult> {
    // Simulate brief realistic async retrieval without artificial delays
    return {
      success: true,
      articles: MOCK_ARTICLES.map((article) => ({
        ...article,
        fetchedAt: new Date().toISOString(),
      })),
      source: MOCK_PROVIDER_CONFIG.name,
      fetchedAt: new Date().toISOString(),
      statusCode: 200,
    };
  }
}
