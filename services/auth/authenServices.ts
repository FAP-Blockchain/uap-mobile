import api from "@/config/axios";
import { LoginFormValues } from "@/types/auth/login";

const url = "/auth";
export const AuthenServices = {
  loginUser: (values: LoginFormValues) => {
    return api.post(`${url}/login`, values);
  },
};
