export interface Todo {
  id?: string;
  title: string;
  content: string;
  status: Status;
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
}
