// FAQ data. We do NOT include any F.A.Q about outcomes, savings guarantees, or
// coverage availability — every Q/A is about the structure of the system, not
// a promise about performance or cost.

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCluster {
  slug: string;        // url segment
  title: string;       // h1
  description: string; // meta
  parent: string;      // url of parent page
  items: FaqItem[];
}

export const faqClusters: Record<string, FaqCluster> = {
  general: {
    slug: 'general',
    title: 'Frequently asked questions',
    description: 'Frequently asked questions about how Sunledger works, what to expect from the assessment process, and your rights as a homeowner researching solar.',
    parent: '/',
    items: [
      {
        question: 'What is Sunledger?',
        answer:
          'Sunledger is a lead-generation service that connects U.S. homeowners researching rooftop solar with vetted installer partners. We are not an installer, lender, or utility.',
      },
      {
        question: 'How does the assessment work?',
        answer:
          'You submit your information through our intake form. We share your request with installer partners who serve your area. Those installers may then contact you with quotes, site assessments, or follow-up questions. We do not control their response time or the contents of their quotes.',
      },
      {
        question: 'Will I receive a guaranteed number of quotes?',
        answer:
          'No. The number of installer responses, the timing of those responses, and the contents of any quotes depend on factors we cannot control. Submitting a request does not guarantee contact, a quote, financing approval, or installation.',
      },
      {
        question: 'How does Sunledger make money?',
        answer:
          'We are paid by the installer partners we connect you with when a lead results in a qualified sales opportunity. This is standard in the lead-generation industry. We do not add any cost to the price you pay your installer.',
      },
      {
        question: 'How can I revoke consent for contact?',
        answer:
          'You can revoke your consent to be contacted at any time. See our TCPA disclosure page for the opt-out procedures, including instructions to stop calls or texts. Your installer partners may have their own opt-out procedures.',
      },
      {
        question: 'Do you share my information with anyone else?',
        answer:
          'We share your information with the installer partners we believe can serve your area. We do not sell your information to third parties for unrelated marketing purposes. See our Privacy Policy for the full disclosure.',
      },
      {
        question: 'Are the savings numbers I see on the site guaranteed?',
        answer:
          'No. Any savings, payback period, or system performance figures shown on Sunledger or in materials from our installer partners are projections, not guarantees. Actual results depend on your specific installation, electricity rates, weather, shading, and other factors outside our control.',
      },
      {
        question: 'How long does the process take?',
        answer:
          'From the date you submit your request, you may hear from installer partners within hours to several weeks depending on your area and the volume of requests in your region. Installation, if you proceed, typically takes weeks to months from contract to a working system due to permitting, interconnection, and equipment scheduling.',
      },
    ],
  },
  california: {
    slug: 'california',
    title: 'California solar FAQs',
    description: 'California-specific questions about NEM tariffs, utility interconnects, and what to ask an installer in California.',
    parent: '/states/california',
    items: [
      {
        question: 'What is NEM 3.0 in California?',
        answer:
          'NEM 3.0 (Net Billing Tariff) is the current successor tariff for new residential solar customers in California\'s three large investor-owned utilities (PG&E, SCE, and SDG&E). It values exports at a lower rate than full retail and applies time-of-use export periods. The California Public Utilities Commission has detailed guidance and historical documents on its site.',
      },
      {
        question: 'How does NEM 3.0 affect battery storage?',
        answer:
          'NEM 3.0 makes residential battery storage significantly more valuable than under NEM 1.0/2.0 because exported electricity is credited at a lower rate than retail. Storing solar energy for self-use (instead of exporting it) improves the per-kWh value of every kWh your panels produce.',
      },
      {
        question: 'Should I use a California installer or a national one?',
        answer:
          'Both can be appropriate. California is a mature solar market with well-established installers and newer entrants. Whatever you choose, confirm their California contractor license, their Clean Bill of Rights or comparable disclosures, and recent references from customers in your utility territory.',
      },
      {
        question: 'Are there state-level rebates in California?',
        answer:
          'California runs incentive programs administered by the CPUC, including self-generation incentive programs focused on storage and resilience for certain customer classes. Confirm current program status with the CPUC and your installer.',
      },
      {
        question: 'How long does interconnection take in California?',
        answer:
          'Interconnection timelines vary by utility and application volume. Historically, the three large IOUs have target timelines for residential interconnections; actual timelines may be longer. Your installer should give you a current estimate.',
      },
    ],
  },
  texas: {
    slug: 'texas',
    title: 'Texas solar FAQs',
    description: 'Texas-specific questions about the ERCOT market, TDU vs REP, and what to ask an installer in Texas.',
    parent: '/states/texas',
    items: [
      {
        question: 'How does solar work in the ERCOT market?',
        answer:
          'Texas deregulated electricity markets (most of the state) operate on a Retail Electricity Provider (REP) model: a Transmission and Distribution Utility (TDU) owns the wires and a REP sells you electricity. Your export credits depend on your REP\'s solar tariff, which varies widely.',
      },
      {
        question: 'Do Texas utilities offer net metering?',
        answer:
          'Texas does not mandate a single statewide net metering tariff. Instead, REPs and TDUs offer a variety of "value of solar" tariffs and buyback plans. The credit rates vary; ask your installer and your REP for current terms.',
      },
      {
        question: 'Are Texas electricity rates good for solar?',
        answer:
          'Texas has historically had high peak rates and frequent rate volatility, which makes time-of-use and self-consumption savings meaningful. However, REP rates change frequently. Confirm current rates and the buyback plan before signing a solar contract.',
      },
      {
        question: 'How do I verify a Texas solar installer?',
        answer:
          'Confirm the installer\'s Texas electrical contractor license, insurance, and recent references. Ask whether they handle TDU permitting and interconnection on your behalf.',
      },
      {
        question: 'Are there Texas solar rebates?',
        answer:
          'Texas does not currently run a statewide rooftop solar rebate program, but some municipal utilities and co-ops offer limited programs. Property tax exemptions for residential solar are in place in many cases. Confirm current rules with the Texas comptroller and your local utility.',
      },
    ],
  },
  florida: {
    slug: 'florida',
    title: 'Florida solar FAQs',
    description: 'Florida-specific questions about hurricane-rated installations, utility tariffs, and HOA rules.',
    parent: '/states/florida',
    items: [
      {
        question: 'What should I know about hurricane-rated solar?',
        answer:
          'Florida installers are accustomed to designing for high wind zones. Confirm that your installer uses racking and attachments rated for your specific wind zone, and that the installation meets the Florida Building Code in your jurisdiction.',
      },
      {
        question: 'How does Florida\'s solar rights law affect HOA restrictions?',
        answer:
          'Florida Statute 163.04 prohibits HOAs from prohibiting residential solar installations. HOAs may impose reasonable aesthetic placement (e.g., not on the front-facing slope of the roof if an alternative exists) but cannot prohibit solar outright.',
      },
      {
        question: 'What happened to Florida net metering?',
        answer:
          'Florida\'s investor-owned utilities rolled back full retail rate net metering for new residential customers in 2023. Newer tariffs credit exports at a lower rate and may add monthly fixed charges for solar customers. Verify terms with your utility.',
      },
      {
        question: 'Is battery storage worth it in Florida?',
        answer:
          'Florida has high hurricane risk and frequent outage events. Battery storage paired with solar can power critical loads during outages. The right sizing depends on your risk tolerance and the loads you want to back up.',
      },
    ],
  },
  arizona: {
    slug: 'arizona',
    title: 'Arizona solar FAQs',
    description: 'Arizona-specific questions about extreme heat, utility tariff changes, and what to ask an installer in Arizona.',
    parent: '/states/arizona',
    items: [
      {
        question: 'How does extreme heat affect solar panel output?',
        answer:
          'Solar panels produce less in extreme heat. Arizona summers see panel cell temperatures well above the 25°C lab standard, which reduces output by roughly 10%–15% during summer afternoons. Annual production remains strong because of the abundant sunshine.',
      },
      {
        question: 'What is the current Arizona solar tariff?',
        answer:
          'Arizona Public Service, Salt River Project, and Tucson Electric Power each have their own solar tariffs that have changed in recent years. Confirm the current tariff with your installer and your utility before signing a contract.',
      },
      {
        question: 'Should I add a battery in Arizona?',
        answer:
          'Batteries in Arizona are typically paired with solar to provide backup during summer monsoon storms and to manage time-of-use rates. Some utilities offer specific TOU schedules that reward stored solar used in the early evening. Confirm program availability with your utility.',
      },
      {
        question: 'Are Arizona solar incentives still funded?',
        answer:
          'Arizona state-level solar incentives have changed frequently. Verify current status with DSIRE and the Arizona Corporation Commission (the state\'s public utilities regulator). Most Arizona homeowners today are choosing solar on the strength of the utility economics, not state incentives.',
      },
    ],
  },
  'new-york': {
    slug: 'new-york',
    title: 'New York solar FAQs',
    description: 'New York-specific questions about NY-Sun, Community DG, and what to ask an installer in New York.',
    parent: '/states/new-york',
    items: [
      {
        question: 'What is the NY-Sun program?',
        answer:
          'NY-Sun is the New York State Energy Research and Development Authority\'s (NYSERDA) incentive program for residential and small commercial solar. It operates as a block-based incentive structure that adjusts over time. Confirm current funding and terms with NYSERDA and your installer.',
      },
      {
        question: 'What is Community Distributed Generation (CDG)?',
        answer:
          'CDG (Community DG) lets you receive credits on your electricity bill for solar generation produced at a project elsewhere on the grid. If you\'re a renter, live in a building you don\'t own, or your roof is unsuitable, CDG is often the way to participate. NYSERDA administers related programs.',
      },
      {
        question: 'How do I pick an installer in New York?',
        answer:
          'Confirm the installer is licensed in your jurisdiction (city or county), ask about NY-Sun program experience and references, and verify their proposal accurately models your utility\'s tariff. Con Edison, National Grid, and other utilities have specific interconnection procedures.',
      },
      {
        question: 'Are New York solar incentives funded in 2026?',
        answer:
          'Funding levels change. Confirm current NY-Sun block status with NYSERDA before signing a contract, as incentives sometimes step down between funding blocks.',
      },
    ],
  },
  massachusetts: {
    slug: 'massachusetts',
    title: 'Massachusetts solar FAQs',
    description: 'Massachusetts-specific questions about the SMART program, net metering caps, and what to ask an installer.',
    parent: '/states/massachusetts',
    items: [
      {
        question: 'How does the SMART program work?',
        answer:
          'SMART (Solar Massachusetts Renewable Target) is the Massachusetts incentive program for solar. It pays a per-kWh production credit on top of net-metered exports. SMART blocks have specific terms and step down over time. Verify current block status with the Massachusetts Department of Energy Resources and your installer.',
      },
      {
        question: 'Can I use net metering and SMART together?',
        answer:
          'Yes. Net metering credits and SMART production credits are separate bill components. The interaction depends on your utility\'s tariff (Eversource, National Grid, or Unitil for most residential customers). Talk to your installer about how both apply to your system.',
      },
      {
        question: 'How are Massachusetts solar incentives funded?',
        answer:
          'SMART funding is tied to the Massachusetts Renewable Energy Trust and Alternative Compliance Payments (ACPs) paid by utilities. Funding availability changes periodically. Confirm current SMART block status with the Department of Energy Resources before signing.',
      },
      {
        question: 'What should I look for in a Massachusetts installer?',
        answer:
          'Confirm the installer\'s Massachusetts HIC license, references from your utility\'s territory, and a contract that explicitly addresses SMART and net metering credit calculation. Some installers are stronger in one utility\'s territory than another.',
      },
    ],
  },
};

export function faqClusterSlugs(): string[] {
  // Only clusters with their own page — 'general' is rendered at /faq.
  return ['california', 'texas', 'florida', 'arizona', 'new-york', 'massachusetts'];
}
