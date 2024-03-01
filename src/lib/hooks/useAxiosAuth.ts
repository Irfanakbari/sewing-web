"use client";
import {useEffect} from "react";
import {axiosAuth} from "@/lib/axios";

const useAxiosAuth = () => {
  // const { data: session, update } = useSession({
  //   required: true
  // });

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config: any) => {

        // if (!config.headers["Authorization"]) {
        //   config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
        // }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response: any) => {
        return response;
      },
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 || error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // const res = await update()
          // if(res?.error) return signOut({redirect:true})
          // prevRequest.headers["Authorization"] = `Bearer ${res?.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosAuth;
};

export default useAxiosAuth;