import { fetcher } from '../fetcher';
import useSWRMutation from 'swr/mutation';
import { Methods } from '../typings';
import Endpoint from '../Endpoint';
import { omit } from 'lodash';

export const useGetStatus = () => {
  const { trigger, error } = useSWRMutation<profile.ResponeGetStatus, any, string, any>(`${Endpoint.Profile.GET_STATUS}`, (url: string, { arg }: { arg: any }) => {
    return fetcher(url, Methods.GET, arg);
  });
  return { triggerGetStatus: trigger, errorGetStatus: error };
};

export const useGetInfo = () => {
  const { trigger, error } = useSWRMutation<any, any, string, any>(`${Endpoint.Profile.GET_INFO}`, (url: string, { arg }: { arg: any }) => {
    return fetcher(url, Methods.GET, arg);
  });
  return { triggerGetInfo: trigger, errorGetInfo: error };
};

export const useUpdateInfo = () => {
  const { trigger, error } = useSWRMutation<any, any, string, profile.ParamsUpdateInfo>(`${Endpoint.Profile.UPDATE_INFO}`, (url: string, { arg }: { arg: any }) => {
    return fetcher(url, Methods.PATCH, arg);
  });
  return { triggerUpdateInfo: trigger, errorUpdateInfo: error };
};
