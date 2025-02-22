import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { addToast } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { UserNotLoggedInIcon } from "@/components/icons";

export async function getStaticProps(context: { locale: any; }) {
  return {
    props: {
      messages: (await import(`../../intl/${context.locale}.json`)).default
    }
  };
}
export default function DashPage() {
  const router = useRouter()
  const toastShownRef = useRef(false); 
  const loginToastT = useTranslations("LoginToast");
  const t = useTranslations("Dashboard");

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    
    if (!authToken && !toastShownRef.current) {
      addToast({
        title: loginToastT("title"),
        description: loginToastT("description"),
        timeout: 3000,
        shouldShowTimeoutProgess: true,
        icon: (<UserNotLoggedInIcon />)
      });
      toastShownRef.current = true;
      router.push("/login")
    }
  }, []);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Dashboard</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
