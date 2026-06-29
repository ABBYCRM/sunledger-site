export interface Pillar {
  slug: string;
  name: string;
  h1: string;
  description: string;
  metaDescription: string;
  intro: string;
  sections: { id: string; heading: string; body: string }[];
}

export const pillars: Pillar[] = [
  {
    slug: 'how-solar-works',
    name: 'How solar works',
    h1: 'How rooftop solar actually works',
    description: 'A beginner-friendly explanation of how photovoltaic solar panels convert sunlight into electricity for your home, including the components and the basics of grid-tied versus off-grid systems.',
    metaDescription: 'How solar panels turn sunlight into electricity. Clear, plain-English explanation of photovoltaic systems, inverters, and grid-tied solar for homeowners.',
    intro:
      'Solar electric systems for homes are simpler than they look. At the highest level, sunlight strikes the panels, the panels produce direct-current electricity, an inverter converts that to alternating current your home can use, and any excess flows back to the grid if your home is grid-tied. The rest of this page walks through each piece.',
    sections: [
      {
        id: 'photovoltaic-effect',
        heading: 'The photovoltaic effect, in plain English',
        body:
          'Solar panels are made up of many photovoltaic cells, usually silicon. When photons from sunlight hit those cells, electrons are knocked loose and start moving — that is the photovoltaic effect. The moving electrons form a direct current, which the panel\'s wiring collects and sends down to a junction box and onward to your inverter. The cell materials, the cell architecture (monocrystalline, polycrystalline, or thin-film), and the way panels are wired together determine how much electricity a system can produce for any given amount of sunlight.',
      },
      {
        id: 'inverter-roles',
        heading: 'What the inverter does',
        body:
          'Your home and the grid run on alternating current, but solar panels produce direct current. The inverter\'s job is to convert DC to AC and to keep voltage and frequency within the bounds your utility uses. There are three common topologies: string inverters (one central inverter for many panels), microinverters (one small inverter per panel, often on the back of the panel), and power optimizers (panel-level electronics plus a central string inverter). Each has tradeoffs in cost, monitoring granularity, and resilience to partial shading.',
      },
      {
        id: 'grid-tied-and-battery',
        heading: 'Grid-tied, hybrid, and off-grid systems',
        body:
          'Most U.S. residential systems are grid-tied: they connect to the utility grid and can both draw from and export to it. A hybrid system adds batteries so the home can run on stored solar power during outages. A true off-grid system runs without the utility, requires enough battery capacity to cover several cloudy days, and is rare in suburban U.S. settings. Battery storage has become much more common for resilience, time-of-use bill management, and participation in utility programs that pay for power during peak hours.',
      },
      {
        id: 'what-determines-output',
        heading: 'What actually determines how much power you produce',
        body:
          'Output depends on the panel rating, the orientation and tilt of the array, shading, weather, soiling (dust and debris on panels), temperature, and inverter efficiency. Panels produce less in extreme heat. A south-facing roof at a moderate tilt is the classic U.S. setup, but east- and west-facing arrays work too and can be designed to match a home\'s typical usage pattern. Shading from trees, neighboring structures, or rooftop obstructions can significantly reduce output — even partial shading on one panel can affect a string of panels depending on the inverter topology.',
      },
      {
        id: 'measuring-output',
        heading: 'How output is measured',
        body:
          'Panels are rated in watts under standard test conditions (STC): 1,000 watts per square meter of sunlight, 25°C cell temperature, and a specific air mass. Real-world output is lower because conditions are rarely STC. System size in the U.S. is usually described as the panel rating in kilowatts (kW). Annual energy is estimated in kilowatt-hours (kWh) using tools like PVWatts that account for your location, tilt, azimuth, and shading. A typical U.S. home system is 5–10 kW and produces roughly 6,000–12,000 kWh per year depending on location.',
      },
    ],
  },
  {
    slug: 'costs-and-financing',
    name: 'Costs & financing',
    h1: 'How residential solar is paid for',
    description: 'Cash purchase, solar loan, solar lease, and power purchase agreement (PPA) explained side by side, with honest context on what each method does and does not guarantee.',
    metaDescription: 'Cash, solar loan, lease, and PPA — how each residential solar financing method works, who each one fits, and what to watch out for in the contract.',
    intro:
      'There are four main ways U.S. homeowners pay for residential solar: cash purchase, solar loan, solar lease, and power purchase agreement (PPA). Each has different up-front costs, ownership implications, and incentives. The right choice depends on your cash position, your credit, your tolerance for complexity, and how long you expect to stay in your home.',
    sections: [
      {
        id: 'cash-purchase',
        heading: 'Cash purchase',
        body:
          'A cash purchase means you own the system outright from day one. You pay the installer directly and own the equipment, the warranty, and the right to whatever incentives and tax credits apply. Cash buyers typically get the simplest contract and the highest long-term savings because all the electricity is yours at zero fuel cost. The tradeoff is the up-front capital requirement, which for a typical U.S. system can run into the mid-five-figures before incentives. Any savings estimates your installer shares should be treated as a projection, not a guarantee — actual savings depend on future electricity rates and how your system actually performs.',
      },
      {
        id: 'solar-loan',
        heading: 'Solar loan',
        body:
          'A solar loan lets you own the system while financing the purchase, typically over 10–20 years. Loans are offered by the installer, third-party lenders, or secured-home-equity-style products. You own the equipment and the tax credit remains your benefit, but the monthly payment is a fixed obligation regardless of how the system performs. Loan terms vary widely on interest rate, term length, and whether the loan is secured by the home. A loan is usually a better long-term financial choice than a lease, but only if the interest rate is reasonable relative to your other financing options.',
      },
      {
        id: 'solar-lease',
        heading: 'Solar lease',
        body:
          'A solar lease is a contract where a third party owns the system on your roof and you pay them a fixed monthly amount. You do not own the equipment, so the federal residential solar tax credit (where applicable) goes to the lease owner, not to you. Leases often include a maintenance provision so the lease owner is responsible for repairs. Watch out for escalator clauses that raise your monthly payment over time, and for the fact that if you sell the home, the new owner must agree to take over the lease or you may pay a buyout.',
      },
      {
        id: 'ppa',
        heading: 'Power purchase agreement (PPA)',
        body:
          'A PPA is similar to a lease in ownership but bills you per kilowatt-hour instead of a flat monthly amount. You agree to buy all the electricity your system produces at a per-kWh price that may be lower than your utility rate (often with an annual escalator). PPAs are common in some state markets. Read the escalation rate carefully and confirm whether the PPA terms allow you or a future buyer to buy out the system on standard terms.',
      },
      {
        id: 'what-to-compare',
        heading: 'What to compare when you receive quotes',
        body:
          'When comparing quotes, normalize for system size (kW), equipment (panel make, model, wattage; inverter make, model, and topology), warranty terms (panel product warranty, inverter warranty, workmanship warranty), the finance method, the dollar-per-watt figure, and the projected first-year output. Ask each installer to show you the same assumptions (kWh produced, electricity rate trajectory, rate of utility inflation) so you are comparing apples to apples. If two installers cannot agree on system size or projected output, that is itself useful information.',
      },
    ],
  },
  {
    slug: 'incentives-and-tax-credits',
    name: 'Incentives & tax credits',
    h1: 'Solar incentives and tax credits explained',
    description: 'Federal, state, and utility solar incentives for U.S. homeowners — what they are, who administers them, and how to verify the current status of any specific program.',
    metaDescription: 'Federal solar tax credit (ITC/IRA), state rebates, utility tariffs, and SRECs explained — with a pointer to DSIRE for current program status.',
    intro:
      'Most U.S. residential solar incentives fall into three buckets: federal tax credits, state-administered programs (rebates, SRECs, production incentives), and utility-administered programs (tariffs, time-of-use rates, demand response credits). Each program has its own eligibility, paperwork, and timeline. This page explains the structure. For the current status of any specific program, link out to DSIRE and your utility\'s tariffs — those are the canonical sources.',
    sections: [
      {
        id: 'federal-itc',
        heading: 'The federal residential solar tax credit',
        body:
          'The federal Residential Clean Energy Credit (often called the solar ITC, established under the Inflation Reduction Act) allows qualifying homeowners to claim a percentage of qualified solar expenditures as a credit against federal income tax. To claim it you must purchase a qualifying system (owned, not leased under a third-party structure), install it at a U.S. residence you use as a home, and file IRS Form 5695 with your federal return. The exact percentage and the existence of this credit depend on the law in effect at the time you file. Verify current rules with a tax professional and the IRS, not with marketing materials from installers.',
      },
      {
        id: 'state-incentives',
        heading: 'State-administered incentives',
        body:
          'State incentives include upfront rebates (paid at install), performance-based incentives (paid per kWh produced), SRECs (Solar Renewable Energy Credits, a tradable certificate representing the environmental attributes of solar generation), and property tax exemptions that prevent solar from raising your assessed value. Each is administered by a different state agency — sometimes the energy office, sometimes the public utilities commission. Eligibility, funding availability, and application timing all change frequently. DSIRE is the most reliable independent source for tracking state-level programs.',
      },
      {
        id: 'utility-programs',
        heading: 'Utility programs and tariffs',
        body:
          'Utilities run their own solar programs, including net metering (or successor tariffs as in California\'s NEM 3.0), time-of-use rates, demand response programs, and battery credits. These programs are governed by your state\'s public utilities commission and by your utility\'s tariff filings. Terms vary dramatically between IOUs (investor-owned utilities), municipal utilities, and rural electric cooperatives — even within the same state. Always check your specific utility\'s tariff for the most current terms.',
      },
      {
        id: 'how-to-verify',
        heading: 'How to verify any incentive claim',
        body:
          'A reliable workflow: (1) find the program on DSIRE; (2) confirm with the administering agency\'s own website; (3) ask the installer for the program\'s published terms and documentation; (4) confirm with a tax professional on federal credits. Be skeptical of any quote that lists dollar values for incentives without a citation, or that includes programs you cannot find on a state website. Legitimate programs are publicly documented; illegitimate ones are not.',
      },
    ],
  },
  {
    slug: 'panels-and-equipment',
    name: 'Panels & equipment',
    h1: 'Panels, inverters, and the equipment you should understand',
    description: 'The honest guide to what equipment goes on a residential solar roof — panels, inverters, racking, monitoring — and which differences actually matter for performance.',
    metaDescription: 'Solar panels, inverters, racking, monitoring — what each piece does and which differences actually affect your home system. No marketing spin.',
    intro:
      'A residential solar system is mostly panels and one or more inverters mounted on racking. The system also includes DC and AC disconnects, rapid shutdown equipment (required by code), monitoring hardware or software, and the wiring that ties it all together. This page walks through each piece and what to look for.',
    sections: [
      {
        id: 'panels',
        heading: 'Solar panels: what differs and what doesn\'t',
        body:
          'Most U.S. residential panels are monocrystalline silicon, increasingly with TOPCon or HJT or back-contact cell architectures. Wattage per panel ranges from roughly 400W to 500W+ in 2026. Higher wattage panels are physically larger and have higher voltage, which changes stringing math. Cell efficiency, temperature coefficient, and the product/performance warranty are the most consequential differences. The visual difference between manufacturers on a residential roof is usually smaller than marketing suggests — your installer\'s panel choice typically tracks their supply agreements, not dramatic performance differences.',
      },
      {
        id: 'inverters',
        heading: 'Inverters and topologies',
        body:
          'String inverters (Enphase, SolarEdge, Fronius, SMA, and others) are the most cost-efficient at residential scale. Microinverters (Enphase IQ8 class) attach to each panel and offer panel-level monitoring and shade tolerance — usually at a small price premium. Power optimizers (SolarEdge) are a hybrid: panel-level electronics plus a central string inverter. The choice affects monitoring granularity, shade performance, expansion flexibility, and warranty service. For most U.S. roofs with decent sun exposure, the topology matters less than installer craftsmanship and overall system design.',
      },
      {
        id: 'racking-and-mounting',
        heading: 'Racking and roof attachments',
        body:
          'Racking is the aluminum frame that holds panels a few inches above your roof and attaches to your roof structure through sealed penetrations. Quality racking (IronRidge, Unirac, SnapNRack, and others) is engineered to handle wind and snow loads for your specific jurisdiction. The number of attachment points, the type of flashing used, and the location of attachments relative to rafters are the things your installer should be able to explain. Composition shingle, tile, metal, and flat roofs each have different attachment systems.',
      },
      {
        id: 'monitoring-and-safety',
        heading: 'Monitoring and safety equipment',
        body:
          'Modern inverters ship with monitoring apps that show per-panel or system-level output, alerts on faults, and historical production. Monitoring is essential to catching underperformance. Safety equipment includes DC disconnects, AC disconnects, and rapid-shutdown initiation (required by NEC 690.12 for first-responder safety). Your installer should walk you through all of these during commissioning and register your equipment warranties for transfer to you as the homeowner.',
      },
    ],
  },
  {
    slug: 'battery-storage',
    name: 'Battery storage',
    h1: 'Residential battery storage: what it actually adds',
    description: 'How home batteries work with solar, what loads they cover during an outage, and the cost/value tradeoff honest enough to plan around.',
    metaDescription: 'How home solar batteries work, what they power during an outage, and the real cost/value calculation for residential battery storage.',
    intro:
      'A home battery, paired with solar, stores energy for use when the panels are not producing. For most U.S. homeowners today, the practical value of a battery is one or more of three things: backup during grid outages, time-of-use bill management (charge off-peak, use during peak), and participation in utility programs that pay you for stored energy. This page explains how each works and what to ask.',
    sections: [
      {
        id: 'battery-basics',
        heading: 'Battery basics',
        body:
          'Most U.S. residential batteries are lithium iron phosphate (LFP) or nickel manganese cobalt (NMC) chemistries, with capacities from roughly 5 kWh to 40+ kWh. Usable capacity is less than nameplate capacity because depth-of-discharge limits extend cycle life. A typical U.S. home backup setup covers the critical loads (refrigeration, internet, lighting, well pump if applicable, some outlets) rather than the entire home — covering the entire home with a long-duration outage requires far more battery capacity and is correspondingly more expensive.',
      },
      {
        id: 'tou-arbitrage',
        heading: 'Time-of-use bill management',
        body:
          'If your utility uses time-of-use rates, a battery can shift solar production from the middle of the day to the evening peak, increasing the value of every kWh your panels produce. The actual savings depend on the rate spread between your peak and off-peak periods, your battery round-trip efficiency, and how the utility credits exports during the day. Ask your utility for the current TOU schedule and your installer to model the specific value with your usage pattern.',
      },
      {
        id: 'utility-vpp',
        heading: 'Utility virtual power plant programs',
        body:
          'Some utilities (including Green Mountain Power and several California investor-owned utilities) run virtual power plant programs that pay you a per-kWh credit for storing energy and exporting it during grid events. These programs change frequently and have geographic eligibility rules. If you have a battery, ask your utility whether a VPP or demand-response program exists and what it pays.',
      },
      {
        id: 'what-to-buy',
        heading: 'What to look at when choosing a battery',
        body:
          'Common choices include the Tesla Powerwall 3, Enphase IQ Battery, FranklinWH, and several others. Compare usable capacity, continuous and peak power output, warranty terms (years and cycles), round-trip efficiency, the inverter pairing requirements (AC-coupled vs DC-coupled), and the integration story with your inverter and your utility program eligibility. The brand choice matters less than correct sizing and a clean installation.',
      },
    ],
  },
  {
    slug: 'going-solar',
    name: 'Going solar',
    h1: 'The step-by-step residential solar process',
    description: 'What actually happens between signing a solar contract and having a working system on your roof — site assessment, design, permits, installation, inspection, and interconnection.',
    metaDescription: 'A clear step-by-step explanation of how a residential solar project moves from first quote to a system that is producing electricity on your roof.',
    intro:
      'A residential solar project moves through a predictable sequence of steps. Most of them happen behind the scenes at your installer; understanding the sequence helps you know what to ask and what to expect. Below is the typical U.S. residential workflow — there is some variation by state and utility, but the outline holds.',
    sections: [
      {
        id: 'site-assessment',
        heading: '1. Site assessment and design',
        body:
          'Your installer uses satellite imagery, on-site measurements, or both to model your roof (size, orientation, pitch, obstructions, shading) and design a system that fits. The design includes the number of panels, their layout, the inverter topology, the wiring path, and the equipment locations (inverter, meter, rapid shutdown initiator). This step also includes a structural review to confirm the roof can carry the system\'s weight — a typical residential system adds 3–4 pounds per square foot.',
      },
      {
        id: 'permitting',
        heading: '2. Permitting and interconnection application',
        body:
          'Your installer pulls the building permit from your local jurisdiction (city or county) and submits an interconnection application to your utility. The interconnection application tells the utility you intend to export power to the grid; the utility responds with approval and a net-metering or successor-tariff agreement. The interconnection process is the slowest step in many U.S. markets — often 30 to 90 days depending on the utility.',
      },
      {
        id: 'installation',
        heading: '3. Installation day',
        body:
          'Most U.S. residential systems install in one to three days. Crews mount racking, attach panels, run DC and AC wiring, install the inverter, label all equipment, and test the system. The crews also stage the rapid shutdown initiator at your service entrance. Some homeowners stay home; some don\'t. Expect some noise on the roof and possibly temporary power shutoffs while critical connections are made.',
      },
      {
        id: 'inspection',
        heading: '4. Inspection and interconnection approval',
        body:
          'After installation, the local building inspector verifies code compliance. Once the inspection passes, your utility schedules a final interconnection visit (or remote meter swap depending on the utility) to flip your bidirectional meter and authorize operation. Until this step, your system is usually not allowed to operate in export mode. Operations vary by utility — some let you run on solar-only (no export) before interconnection; others require full interconnection approval.',
      },
      {
        id: 'commissioning',
        heading: '5. Commissioning and ongoing monitoring',
        body:
          'Your installer should walk you through the system, register warranties, and set up monitoring on your phone. Confirm you have access to the inverter monitoring portal and know how to read it. Many installers also include a workmanship warranty (often 10 years) on top of the manufacturer product and performance warranties. Keep all your documentation — proposals, contracts, inspection records, warranty cards — because they matter for resale, insurance, and warranty claims.',
      },
    ],
  },
];

export function pillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
