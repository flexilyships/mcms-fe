export type VesselStatus = "ACTIVE" | "IN_MAINTENANCE" | "UNDER_INSPECTION" | "DECOMMISSIONED";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Vessel {
  id: string;
  name: string;
  imoNumber: string;
  callSign: string;
  flagState: string;
  vesselType: string;
  yearBuilt: number;
  grossTonnage: number;
  status: VesselStatus;
  riskLevel: RiskLevel;
  crewCount: number;
  expiringCertificatesCount: number;
  createdAt: string;
  updatedAt: string;
}
