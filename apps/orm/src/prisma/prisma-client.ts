import { Prisma, PrismaClient } from '../../prisma/generated';

export class TypedPrismaClient extends PrismaClient<
  Prisma.PrismaClientOptions,
  Prisma.LogLevel
> {
  constructor(params: {
    onQuery?: (event: Prisma.QueryEvent) => void;
    onError?: (event: Prisma.LogEvent) => void;
    onInfo?: (event: Prisma.LogEvent) => void;
    onWarn?: (event: Prisma.LogEvent) => void;
  }) {
    super({
      log: [
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });

    this.$on('info', (event) => params.onInfo?.(event));
    this.$on('error', (event) => params.onError?.(event));
    this.$on('warn', (event) => params.onWarn?.(event));
    this.$on('query', (event) => params.onQuery?.(event));
  }
}
