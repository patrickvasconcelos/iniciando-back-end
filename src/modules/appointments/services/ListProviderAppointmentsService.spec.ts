import 'reflect-metadata';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list appointments for a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: '123123',
      provider_id: 'user',
      date: new Date(2020, 10, 30, 12, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: '123123',
      provider_id: 'user',
      date: new Date(2020, 10, 30, 13, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'user',
      day: 30,
      month: 11,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
