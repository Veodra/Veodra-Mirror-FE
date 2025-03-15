import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import React, { useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { Divider } from "@heroui/divider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getStaticProps(context: { locale: any }) {
  return {
    props: {
      messages: (await import(`../../intl/${context.locale}.json`)).default,
    },
  };
}

const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, userData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if ((error as any).response) {
      throw new Error("Common.errorGeneric");
    } else if ((error as any).request) {
      throw new Error("Common.networkError");
    } else {
      throw new Error("Common.requestError");
    }
  }
};

export default function LoginPage() {
  const t = useTranslations("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
      isRemember,
    };
    try {
      await loginUser(data);
      console.log(data)
      alert(t("Login.success"));
      router.push("/");
    } catch (err) {
      alert(t((err as Error).message));
    }
  };

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center">
        <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 flex w-5/6 max-w-lg flex-col gap-4 rounded-large">
          <CardBody>
            <p className="text-2xl font-medium text-center">{t("Login.title")}</p>
            <p className="text-md text-default-500 text-center">{t("Login.subtitle")}</p>
            <Form
              className="px-4 py-12 items-center justify-centerflex flex-col gap-3"
              validationBehavior="native"
              onSubmit={handleLogin}
            >
              <Input
                isClearable
                type="email"
                label={t("Login.email")}
                value={email}
                onValueChange={setEmail}
              />
              <Input
                label={t("Login.password")}
                value={password}
                onValueChange={setPassword}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-4xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-4xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              <div className="flex w-full items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm" isSelected={isRemember} onValueChange={setIsRemember}>
                  {t("Login.remember")}
                </Checkbox>
                <Link className="text-default-500 cursor-pointer" onPress={() => router.push("/forgot-password")} size="sm">
                  {t("Login.forgot")}
                </Link>
              </div>
              <Button className="w-full" color="primary" type="submit">
                {t("Login.login")}
              </Button>
            </Form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <p className="text-center text-small">
              {t("Login.createnew")}&nbsp;
              <Link className="text-small cursor-pointer" color="primary" onPress={() => router.push("/register")}>
                {t("Login.signup")}
              </Link>
            </p>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
