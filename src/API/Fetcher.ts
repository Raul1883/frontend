import { pb } from "./PocketBase";

export const create = async <P, R>(
  collectionName: string,
  data: P,
): Promise<R> => {
  return await pb
    .collection(collectionName)
    .create<R>(data as Record<string, unknown>);
};

export const getAll = async <T>(collectionName: string): Promise<T[]> => {
  return await pb.collection(collectionName).getFullList<T>();
};

export const getById = async <T>(
  collectionName: string,
  id: string,
): Promise<T> => {
  return await pb.collection(collectionName).getOne<T>(id);
};

export const update = async <P, R>(
  collectionName: string,
  id: string,
  data: Partial<P>,
): Promise<R> => {
  return await pb
    .collection(collectionName)
    .update<R>(id, data as Record<string, unknown>);
};

export const updateByPath = async <P, R>(
  url: string,
  id: number,
  data: Partial<P>,
): Promise<R> => {
  return await update(url, id, data);
};

export const updateByBody = async <P, R>(
  url: string,
  data: Partial<P>,
): Promise<R> => {
    return await update(url, data.id, data);

};

export const deleteById = async (
  collectionName: string,
  id: string,
): Promise<boolean> => {
  return await pb.collection(collectionName).delete(id);
};
