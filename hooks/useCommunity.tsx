import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";


const fetchCommunitydetails = async() => {
    const response = await api.get("/api/communities?populate=*")
    return response.data
}

export const useFetchCommunityDetails = () => {
    return useQuery<{ data: any }, Error>({
        queryFn: fetchCommunitydetails,
        queryKey: ["communityDetails"],
        meta: {
            errorMessage: "Failed to fetch community details",
          },
 })
}
