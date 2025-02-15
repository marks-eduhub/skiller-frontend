import { Code } from "@mui/icons-material";
import api from "../../lib/axios";

export const register = async (formData: FormData) => {
  try {
    const response = await api.post("/api/auth/local/register", formData);

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("USER", JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(response.statusText || "Registration failed");
    }
  } catch (error) {
    throw error;
  }
};

export const registerUserWithGoogle = async () => {
  try {
    // Step 1: Get Google Auth URL and redirect user to Google for authentication
    // await getGoogleAuthURL(); // This will redirect the user to Google

    // Step 2: Wait for the user to be redirected back with the auth code
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    // Check if the authorization code is present
    if (!authCode) throw new Error("Authorization code not found in URL");

    console.log("Extracted Google Auth Code:", authCode);

    // Step 3: Authenticate user with Strapi using the authCode
    const authData = await authenticateUserWithGoogle(authCode);
    console.log("Authenticated User Data:", authData.data.token);

    // Step 4: Store JWT in local storage
    localStorage.setItem("token", authData.data.token);

    // Step 5: Fetch authenticated user details
    const user = await getAuthenticatedUser(authData.data.token);
    localStorage.setItem("USER", JSON.stringify(user));

    console.log("User Successfully Registered:", user);

    // Step 6: Redirect the user to their dashboard or a relevant page
    // You can redirect the user to the dashboard page after successful registration
    window.location.href = "/dashboard"; // Adjust this as per your app's routing

    return user;
  } catch (error) {
    console.error("Google Sign-Up Error:", error);
    throw error;
  }
};

// export const getGoogleAuthURL = async () => {
//   try {
//     const response = await api.get(`/strapi-googleauth-extended/init`);
//     if (response.status === 200) {
//       window.location.href = response.data.url; // Redirect user to Google login page
//     } else {
//       throw new Error("Failed to fetch Google authentication URL");
//     }
//   } catch (error) {
//     console.error("Error getting Google Auth URL:", error);
//     throw error;
//   }
// };

// 2️⃣ Authenticate User with Redirect Code
export const authenticateUserWithGoogle = async (code: string) => {
  try {
    const response = await api.post(
      `/strapi-googleauth-extended/user-profile`,
      {
        code,
      }
    );

    if (response.status === 200) {
      console.log("profile" + response.data);

      return response.data; // Returns user details and JWT token
    } else {
      throw new Error("Failed to authenticate user");
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export const getAuthenticatedUser = async (token: string) => {
  try {
    const response = await api.get(`/strapi-googleauth-extended/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("user" + response.data);
      return response.data; // Returns authenticated user details
    } else {
      throw new Error("Failed to fetch authenticated user");
    }
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    throw error;
  }
};

// 4️⃣ (Optional) Update User Password
export const updateUserPassword = async (
  token: string,
  newPassword: string
) => {
  try {
    const response = await api.post(
      `/strapi-google-auth/update-password`,
      { password: newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data; // Returns success message
    } else {
      throw new Error("Failed to update password");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const redirectToGoogleAuth = async () => {
  try {
    const response = await api.get(`/strapi-googleauth-extended/init`);
    if (response.status >= 200 && response.status < 300) {
      window.location.href = response.data.url; // Redirect user to Google login page
    } else {
      throw new Error("Failed to fetch Google authentication URL");
    }
  } catch (error) {
    console.error("Error getting Google Auth URL:", error);
    throw error;
  }
};
