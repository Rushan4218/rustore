import { auth } from "@/auth";

const checkPermission = async (allowedRoles: string[]) => {
  const session = await auth();
  const role = session?.user.role;
  if (role && allowedRoles.includes(role)) {
    return true;
  }
  return false;
};
export { checkPermission };
