export default interface StorageProvider {
  save(filePath: string): Promise<string>
  delete(filePath: string): Promise<void>
}