import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    date: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    date: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
