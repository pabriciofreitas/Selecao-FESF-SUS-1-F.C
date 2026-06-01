import type { User } from "@/store/use-user-store";
import { apiRequest } from "./api";

export function loginWithGoogle() {
  return apiRequest<User>("/api/auth/google", {
    method: "POST",
  });
}
