import { apiRequest } from "./api";

export type Contact = {
  name: string;
  phone: string;
};

export function getContacts() {
  return apiRequest<Contact[]>("/api/contatos");
}
