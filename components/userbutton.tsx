import { Button } from "@heroui/button";
import { UserIcon } from "@/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import axios from "axios";
import { getInfo } from "@/utils/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const UserButton = () => {
  const router = useRouter();
  const t = useTranslations();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getInfo();
        setUserInfo(data);
      } catch (err) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      setUserInfo(null); // 清空前端状态
      router.push("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  if (loading) return null; // 加载中不渲染Dropdown，防止状态闪烁

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly aria-label="User" variant="flat">
          <UserIcon className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {!userInfo ? (
          <>
            <DropdownItem key="login" href={"/" + router.locale + "/login"}>
              {t("Login.login")}
            </DropdownItem>
            <DropdownItem key="signup" href={"/" + router.locale + "/register"}>
              {t("Register.signup")}
            </DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem key="profile" className="h-10 gap-2">
              <span className="font-semibold">
                {t("Userbutton.signas1")}&nbsp;
                {userInfo.username}({userInfo.email})&nbsp;
                {t("Userbutton.signas2")}
              </span>
            </DropdownItem>
            <DropdownItem
              key="dashboard"
              href={"/" + router.locale + "/dashboard"}
            >
              Dashboard
            </DropdownItem>
            <DropdownItem key="profile" href={"/" + router.locale + "/profile"}>
              User Settings
            </DropdownItem>
            <DropdownItem
              key="helpandfeedback"
              href={"/" + router.locale + "/help"}
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem key="logout" onPress={logout}>
              {t("Userbutton.logout")}
            </DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
