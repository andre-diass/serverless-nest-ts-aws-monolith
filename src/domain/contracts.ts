export interface OwnedData {
  id: string;
  user_id: string;
}
export interface Equals {
  equals(data: this): boolean;
}
