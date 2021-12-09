import { container } from 'tsyringe';

import StorageProvider from '@infra/providers/storage-provider/storage-provider';
import DiskStorageProvider from '@infra/providers/storage-provider/implementations/disk-storage-provider';

container.registerSingleton<StorageProvider>('StorageProvider', DiskStorageProvider);