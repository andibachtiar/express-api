export type ContactModel = {
  username: string;
  name: string;
};

export type ContactRequest = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export type UpdateContactRequest = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export type ContactResponse = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};
