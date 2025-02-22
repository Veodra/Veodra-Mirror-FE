import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useTranslations } from "next-intl";

export async function getStaticProps(context: { locale: any; }) {
    return {
      props: {
        messages: (await import(`../intl/${context.locale}.json`)).default
      }
    };
}

export default function Custom404() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [orista,  setOrista] = useState("");

    const t = useTranslations("404");

    useEffect(() => {
        const randomNum = Math.random();
        if (randomNum < 1 / 9) {
            setStatus("418");
            setMessage(t("19Message"));
            setOrista(t("19Orista"));
        } else if (randomNum < 1 / 5 && randomNum >= 1 / 9) {
            setStatus("404");
            setMessage(t("15Message"));
            setOrista(t("15Orista"));
        } else {
            setStatus("404");
            setMessage(t("NMessage"));
            setOrista(t("NOrista"));
        }
    }, []);

    return (
        <DefaultLayout>
            <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
            <Card className="w-5/6 absolute md:w-7/12 px-5 py-12">
                <CardBody>
                    <p className="text-7xl font-bold text-center">{status}</p>
                    <p className="text-2xl font-bold text-center">{message}</p>
                    <p className="text-base font-normal text-end text-gray-400">
                        <i>{orista}</i>
                    </p>
                    <div className="inline text-center pt-5">
                        {t("Backto")}<Button color="primary" variant="light" as={Link} href="/">{t("Home")}</Button> {t("or")} 
                        <Button color="secondary" variant="light" onPress={() => window.history.back()}>{t("Previous")}</Button>
                    </div>
                </CardBody>
            </Card>
            </div>
        </DefaultLayout>
    );
}