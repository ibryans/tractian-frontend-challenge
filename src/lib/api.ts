import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://fake-api.tractian.com'
})

export const queryClient = new QueryClient();