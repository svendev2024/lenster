import '@sentry/tracing';

import { decode } from '@cfworker/base64url';

import type { WorkerRequest } from '../types';

export default async (request: WorkerRequest) => {
  const transaction = request.sentry?.startTransaction({
    name: '@lenster/oembed/getImage'
  });

  try {
    const hash = request.query.hash as string;
    const transform = request.query.transform as 'square' | 'large' | string;
    const url = decode(hash);
    const isSquare = transform === 'square';
    const height = isSquare ? 400 : 600;
    const width = isSquare ? 400 : 'auto';
    const image = await fetch(
      `${request.env.IMAGEKIT_URL}/tr:di-placeholder.webp,h-${height},w-${width}/${url}`,
      {
        cf: {
          cacheTtl: 60 * 60 * 24 * 7,
          cacheEverything: true
        }
      }
    );

    return new Response(image.body);
  } catch (error) {
    request.sentry?.captureException(error);
    throw error;
  } finally {
    transaction?.finish();
  }
};
