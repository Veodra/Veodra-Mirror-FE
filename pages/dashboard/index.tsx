import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { addToast } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { UserNotLoggedInIcon } from "@/components/icons";
import { getInfo } from "@/utils/server";

export async function getStaticProps(context: { locale: any }) {
  return {
    props: {
      messages: (await import(`../../intl/${context.locale}.json`)).default,
    },
  };
}
export default function DashPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const toastShownRef = useRef(false);
  const loginToastT = useTranslations("LoginToast");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getInfo();
        setUserInfo(data.user || data);
      } catch (err) {
        if (!toastShownRef.current) {
          addToast({
            title: loginToastT("title"),
            description: loginToastT("description"),
            timeout: 5000,
            shouldShowTimeoutProgress: true,
            icon: <UserNotLoggedInIcon />,
          });
          toastShownRef.current = true;
        }
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return null;

  if (!userInfo) return null;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Hi, {userInfo.username}</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
