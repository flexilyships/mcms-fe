export type CrewRank =
  | "CAPTAIN"
  | "CHIEF_OFFICER"
  | "SECOND_OFFICER"
  | "CHIEF_ENGINEER"
  | "SECOND_ENGINEER"
  | "ABLE_SEAMAN"
  | "DECK_CADET"
  | "CHIEF_COOK";

export type CertificateStatus = "VALID" | "EXPIRING_SOON" | "EXPIRED" | "PENDING_RENEWAL";

export interface STCWCertificate {
  id: string;
  certificateName: string;
  certificateNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  documentUrl?: string;
}

export interface CrewMember {
  id: string;
  firstName: string;
  lastName: string;
  rank: CrewRank;
  nationality: string;
  passportNumber: string;
  seamanBookNumber: string;
  assignedVesselId?: string;
  assignedVesselName?: string;
  certificates: STCWCertificate[];
  complianceStatus: CertificateStatus;
}
