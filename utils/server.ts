import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getInfo() {
  try {
    const response = await axios.get(`${BACKEND_URL}/get-info`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: any) {
    throw new Error("Common.errorGeneric");
  }
}
