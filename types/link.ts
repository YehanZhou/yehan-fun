export interface LinkInterface {
  id?: number;
  title: string;
  url: string;
  categoryId: number;
  rank?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name: string; // Added required field for database schema compatibility
}