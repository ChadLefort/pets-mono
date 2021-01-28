export enum PetType {
  Cat = 'Cat',
  Dog = 'Dog',
  Bird = 'Bird',
  Other = 'Other'
}

export interface IPet {
  id: string;
  name: string;
  age: string;
  type: PetType;
}
