import { Prisma, PrismaClient } from '@@prisma';

export class TypedPrismaClient extends PrismaClient<
  Prisma.PrismaClientOptions,
  Prisma.LogLevel
> {
  constructor({
    onError,
    onInfo,
    onQuery,
    onWarn,
  }: {
    onQuery?: (event: Prisma.QueryEvent) => void;
    onError?: (event: Prisma.LogEvent) => void;
    onInfo?: (event: Prisma.LogEvent) => void;
    onWarn?: (event: Prisma.LogEvent) => void;
  } = {}) {
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

    this.$on('info', (event) => onInfo?.(event));
    this.$on('error', (event) => onError?.(event));
    this.$on('warn', (event) => onWarn?.(event));
    this.$on('query', (event) => onQuery?.(event));
  }
}
