import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import { container } from 'tsyringe'

container.registerSingleton('AppointmentsRepository', AppointmentsRepository)