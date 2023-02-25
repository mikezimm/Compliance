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
  finds: [ `Engineer`, `Engineering`, `Design`, `Designer` ] ,
  suggestions: [ `Drawing`, `Specification` ] ,
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
  finds: [ `Sales`, `Account Manager`, `Customer` ] ,
  suggestions: [ `Contract`, `SOR`, `SOW` ] ,
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
  finds: [ `Controller`, `Tax`, `Comptroller`, `Finance` ] ,
  suggestions: [ `` ] ,
}

export const QualityLabels: ISuggestion = {
  title: `Quality`,
  description: ``,
  finds: [ `Quality`, ] ,
  suggestions: [ `` ] ,
}

export const HumanResLabels: ISuggestion = {
  title: `Human Resources`,
  description: ``,
  finds: [ `Human Resources`, `Payroll` ] ,
  suggestions: [ `` ] ,
}

export const ComplianceLabels: ISuggestion = {
  title: `Compliance`,
  description: ``,
  finds: [ `Compliance` ] ,
  suggestions: [ `Compliance`, `Incidents`, `Audits`, `Privacy`, `Certifications`, `Investigation`, `Recalls`, `Litigation` ] ,
}

export const LabelSuggestions: ISuggestion[] = [
  PurchasingLabels,
  EngineeringLabels,
  ProjManagementLabels,
  CustRelationsLabels,
  ITLabels,
  FinanceLabels,
  HumanResLabels,
  ComplianceLabels,
];

