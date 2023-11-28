import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { IDomainEvent } from './core';
import { DddService } from './ddd.service';
import { DomainCommandBus } from './domain-command-bus';
import { DomainEventBus } from './domain-event-bus';
import { DomainEventPublisher } from './domain-event-publisher';
import { UnhandledExceptionBus } from './unhandled-exeption-bus';

@Module({
  imports: [],
  providers: [
    DddService,
    DomainCommandBus,
    DomainEventBus,
    DomainEventPublisher,
    UnhandledExceptionBus,
  ],
  exports: [
    DddService,
    DomainCommandBus,
    DomainEventBus,
    DomainEventPublisher,
    UnhandledExceptionBus,
  ],
})
export class DddModule<DomainEventBase extends IDomainEvent>
  implements OnApplicationBootstrap
{
  constructor(
    private readonly explorerService: DddService<DomainEventBase>,
    private readonly eventBus: DomainEventBus<DomainEventBase>,
    private readonly domainCommandBus: DomainCommandBus,
  ) {}

  onApplicationBootstrap() {
    const { domainEvents, sagas, domainCommands } =
      this.explorerService.explore();

    this.eventBus.register(domainEvents);
    this.domainCommandBus.register(domainCommands);
    this.eventBus.registerSagas(sagas);
  }
}
