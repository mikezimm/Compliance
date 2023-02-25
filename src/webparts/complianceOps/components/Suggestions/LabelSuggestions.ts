export interface ISuggestion {
  title: string;          // Suggestion Title / Label
  description: string;    // Description of Suggestion
  finds: string[];        // Include if you find any of these
  findsLC?: string[];        // Include if you find any of these
  exclusions?: string[];   // Exclude if you also find any of these
  exclusionsLC?: string[];   // Exclude if you also find any of these
  suggestions: string[];  // Suggestions
  suggestionsLC?: string[];  // Suggestions
}


export const PurchasingLabels: ISuggestion = {
  title: `Purchasing`,
  description: ``,
  finds: [ `Purchasing`, `Buyer`, `Supplier` ] ,
  suggestions: [ `Contract`, `SOR`, `SOW` ] ,
}

export const EngineeringLabels: ISuggestion = {
  title: `Engineering`,
  description: ``,
  finds: [ `Engineer`, `Engineering`, `Design`, `Designer`, `VEVA`, `Patent` ] ,
  suggestions: [ `Drawing`, `Specification`, `Engineering`, `Design`, `VEVA`, `Patent`, `Specification`  ] ,
}

export const ProjManagementLabels: ISuggestion = {
  title: `Project Management`,
  description: ``,
  finds: [ `Program Manager`, `Project Manager` ] ,
  suggestions: [ `Timeline`, `Contract`, `SOR`, `SOW` ] ,
}

export const CustRelationsLabels: ISuggestion = {
  title: `Customer Relations`,
  description: ``,
  finds: [ `Sales`, `Account Manager`, `Customer`, `Sales`, `Marketing`, `Customer` ] ,
  suggestions: [ `MKT-`,`Advertising`, `Orders`, `Customer`, `Market`, `Contract`, `Specification`, `PPAP` ] ,
}

export const ITLabels: ISuggestion = {
  title: `IT`,
  description: ``,
  finds: [ `SharePoint`, `Information Technology`, ] ,
  suggestions: [ `ITS-`, `Software`, `Cyber Security`, `Applications`, `IT projects`, `Help Desk` ] ,
}

export const FinanceLabels: ISuggestion = {
  title: `Finance`,
  description: ``,
  finds: [ `Controller`, `Tax`, `Comptroller`, `Finance`, `Treasury`, `Financing` ] ,
  suggestions: [ `FGA-`, `Financial`, `Finance`, `Treasury`, `Financing`, `Payroll`, `Banking`, `Ledger` ] ,
}

export const QualityLabels: ISuggestion = {
  title: `Quality`,
  description: ``,
  finds: [ `Quality`, ] ,
  suggestions: [ `PPQ-`, `Validation`, `Launch`, `Manufacturing`, `Tooling`, `Inspection`, `Traceability`, `8Ds`, `Specification`, `PPAP` ] ,
}

export const HumanResLabels: ISuggestion = {
  title: `Human Resources`,
  description: ``,
  finds: [ `Human Resources`, `Payroll` ] ,
  suggestions: [ `HUM-`,`Personnel`, `Benefit`, `Labor`, `Payroll` ] ,
}

export const FacilityLabels: ISuggestion = {
  title: `Facility`,
  description: ``,
  finds: [ `Facility`, ] ,
  suggestions: [ `FAC-`,`Maintenance`, `Security`, `Equipment`, `Calibrations`, `Environmental`, `Permits` ] ,
}

// export const SalesLabels: ISuggestion = {
//   title: `Sales`,
//   description: ``,
//   finds: [ `Sales`, `Marketing`, `Customer`] ,
//   suggestions: [ `MKT-`,`Advertising`, `Orders`, `Customer`, `Market`, `Contracts`, ] ,
// }

export const SafetyLabels: ISuggestion = {
  title: `Health and Safety`,
  description: ``,
  finds: [ `Health`, `Safety`, ] ,
  suggestions: [ `HSE-`,`Medical`, `Hazardous`, `Disability`, `Injuries`, `Safety`, `Emergency`, `Permits` ] ,
}

export const ComplianceLabels: ISuggestion = {
  title: `Compliance`,
  description: ``,
  finds: [ `Compliance` ] ,
  suggestions: [ `LEG-`, `Compliance`, `Incidents`, `Audits`, `Privacy`, `Certifications`, `Investigation`, `Recalls`, `Litigation` ] ,
}

export const LabelSuggestions: ISuggestion[] = [
  PurchasingLabels,
  EngineeringLabels,
  ProjManagementLabels,
  CustRelationsLabels,
  ITLabels,
  FinanceLabels,
  QualityLabels,
  HumanResLabels,
  FacilityLabels,
  SafetyLabels,
  ComplianceLabels,
];

