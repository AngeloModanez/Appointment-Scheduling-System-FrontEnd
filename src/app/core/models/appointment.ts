import { AppointmentType } from "./appointment-type";
import { Area } from "./area";
import { Client } from "./client";
import { Professional } from "./professional";

export interface Appointment {
  id: number;
  client: Client;
  area: Area;
  professional: Professional;
  appointmentType: AppointmentType;
  date: Date;
  startTime: string;
  endTime: string;
  comments: string;
}
