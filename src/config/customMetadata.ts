import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_COMMON_AUTH_KEY = 'isCommonAuth';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const PublicAuth = () => SetMetadata(IS_COMMON_AUTH_KEY, true);
