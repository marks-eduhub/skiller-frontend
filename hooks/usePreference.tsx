import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const postBio = async (
  userId: number,
  date_birth: string,
  gender: string,
  phone: string
) => {
  const response = await api.put(
    `/api/users/${userId}`,
    { date_birth, gender, phone },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const postPreferences = async (
  userId: number,
  preferences: Record<string, any>
) => {
  const response = await api.put(
    `/api/users/${userId}`,
    { preferences },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

interface UserResponse {
  preferences: Record<string, any>;
}

interface UserResponse {
  prereferences: Record<string, any>;
}

// export const fetchPreferences = async (
//   userId: number
// ): Promise<UserResponse> => {
//   const response = await api.get<UserResponse>(`/api/users/me`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   return response.data;
// };
export const fetchPreferences = async (
  userId: number
): Promise<{ data: UserResponse }> => {
  const response = await api.get<UserResponse>(`/api/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return { data: response.data }; // Wrap the response in a `data` property
};

export const useFetchPreferences = (userId: number) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["preferences", userId],
    queryFn: () => fetchPreferences(userId),
    enabled: Boolean(userId),
    meta: {
      errorMessage: "Failed to fetch preferences",
    },
  });
};
