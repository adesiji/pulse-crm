// Pipeline stages, in order. The Deals page renders one column per stage.
export const DEAL_STAGES = ['prospecting', 'proposal', 'negotiation', 'won', 'lost'];

export const deals = [
  { id: 'dl_001', title: 'Fleet tracking rollout', company: 'Lagos Freight Co.', value: 12000, stage: 'proposal', owner: 'Amara Okafor' },
  { id: 'dl_002', title: 'POS integration', company: 'Bakare Retail Group', value: 8400, stage: 'prospecting', owner: 'Tunde Bakare' },
  { id: 'dl_003', title: 'Enterprise contract renewal', company: 'Eze & Partners', value: 22000, stage: 'negotiation', owner: 'Chiamaka Eze' },
  { id: 'dl_004', title: 'Payments API pilot', company: 'Chukwu Fintech', value: 42000, stage: 'won', owner: 'David Chukwu' },
  { id: 'dl_005', title: 'Property listing sync', company: 'Aliyu Real Estate', value: 55000, stage: 'proposal', owner: 'Fatima Aliyu' },
  { id: 'dl_006', title: 'Energy usage dashboard', company: 'Owolabi Energy', value: 33000, stage: 'prospecting', owner: 'Bayo Owolabi' },
  { id: 'dl_007', title: 'Claims automation', company: 'Suleiman Health Group', value: 27000, stage: 'negotiation', owner: 'Zainab Suleiman' },
  { id: 'dl_008', title: 'Supply chain visibility', company: 'Ogunleye Foods', value: 31000, stage: 'lost', owner: 'Folake Ogunleye' },
  { id: 'dl_009', title: 'Advisory retainer', company: 'Effiong Consulting', value: 26500, stage: 'won', owner: 'Peace Effiong' },
  { id: 'dl_010', title: 'Export documentation tool', company: 'Garba Agro Exports', value: 19500, stage: 'prospecting', owner: 'Halima Garba' },
];
