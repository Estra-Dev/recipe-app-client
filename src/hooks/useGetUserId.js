export const useGetUserId = () => {
  return window.localStorage.getItem("access_token")
}