import { UserType } from "../types/users";

type Props = {
  currentUser: UserType[];
};

export const setAuthToken = ({ currentUser }: Props) => {
  if (typeof window !== "undefined") {
    if (currentUser) {
      const data = JSON.stringify(currentUser);
      localStorage.setItem("currentUser", data);
    }
  }
};

type GetAuthTokenProps = {
  currentUser: UserType[] | null;
};

export const getAuthToken = (): GetAuthTokenProps => {
  if (typeof window !== "undefined") {
    let data = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(data);

    return { currentUser };
  }
  return { currentUser: null };
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser");
  }
};
