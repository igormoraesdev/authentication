import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export function GET() {
  throw logger.server('Error no Route Handler');
}
