export enum PurchaseStatus {
  NOT_VERIFIED = "not_verified", // Cuando esta pendiente de revision
  VERIFIED = "verified", // Cuando fue verificado por un usuario verificador
  REJECTED = "rejected", // Cuando el ticket fue rechazado
  EXPIRED = "expired" // Cuando la fecha del evento ya paso
};

export interface Purchase {
  id?: number;
  productor?: number;
  event?: number;
  rrpp?: number;
  invoice?: Invoice;
  status?: PurchaseStatus;
  purchase_code?: string;
};

export enum PaymentType {
  VISA_DEBIT = "visa_debit",
  VISA_CREDIT = "visa_credit",
  MASTERCARD_DEBIT = "mastercard_debit",
  MASTERCARD_CREDIT = "mastercard_credit"
};

export interface Invoice {
  id?: number;
  payment_information?: PaymentInformation;
  total_without_fee?: number;
  total_with_fee?: number;
  payment_date?: string;
  invoice_details?: InvoiceDetail[];
};

export interface PaymentInformation {
  id?: number;
  holder_full_name?: string;
  billing_address?: string;
  card_number?: string;
  expiration_date?: string;
  payment_type?: PaymentType;
  ccv?: number;
  dniNumber?: string;
};

export interface InvoiceDetail {
  id?: number;
  name?: string;
  unit_price?: number;
  quantity?: number;
};

