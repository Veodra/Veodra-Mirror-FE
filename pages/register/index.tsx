import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputOtp } from "@heroui/input-otp";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getStaticProps(context: { locale: any }) {
  return {
    props: {
      messages: (await import(`../../intl/${context.locale}.json`)).default,
    },
  };
}

const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/create-user`, userData);
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

const verifyOtp = async (verifyEmail: string, otpCode: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/verify-user`, {
      email: verifyEmail,
      code: otpCode,
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

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isAgreeSelected, setIsAgreeSelected] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const validateEmail = (val: string) =>
    val.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const isEmailInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validateUsername = (val: string) => val.length >= 3 && val.length <= 20;
  const isUsernameInvalid = React.useMemo(() => {
    if (username === "") return false;
    return validateUsername(username) ? false : true;
  }, [username]);

  const validatePassword = (val: string) =>
    val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/i);
  const isPasswordInvalid = React.useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const validateConfirm = (val: string) => val === password;
  const isConfirmInvalid = React.useMemo(() => {
    if (cpassword === "") return false;
    return validateConfirm(cpassword) ? false : true;
  }, [cpassword]);

  const isAllValid =
    !isEmailInvalid &&
    !isUsernameInvalid &&
    !isPasswordInvalid &&
    !isConfirmInvalid;
  const isAllFilled =
    username !== "" && email !== "" && password !== "" && cpassword !== "";

  const handleVerify = async () => {
    try {
      await verifyOtp(email, otpValue);
      alert(t("Verify.verifySuccess"));
      router.push("/login");
    } catch (err) {
      alert(t((err as Error).message));
    }
  };

  const clickOnSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement),
    );
    try {
      const newUser = await createUser(data);
      if (newUser) {
        setIsVerifyOpen(true);
      }
    } catch (err) {
      alert(t((err as Error).message));
    }
  };

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center">
        <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 flex w-5/6 max-w-lg flex-col gap-4 rounded-large">
          <CardBody>
            <p className="text-2xl font-bold text-center">
              {t("Register.title")}
            </p>
            <p className="text-md text-default-500 text-center">
              {t("Register.subtitle")}
            </p>
            <Form
              className="px-4 py-12 items-center justify-centerflex flex-col gap-3"
              validationBehavior="native"
              onSubmit={clickOnSignIn}
            >
              <div className="flex flex-col w-full">
                <Input
                  isRequired
                  isClearable
                  name="username"
                  type="username"
                  label={t("Register.username")}
                  value={username}
                  onValueChange={setUsername}
                  isInvalid={isUsernameInvalid}
                  color={isUsernameInvalid ? "danger" : "success"}
                  errorMessage={isUsernameInvalid && t("Register.usernameTip")}
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                />
                <Input
                  isRequired
                  isClearable
                  name="email"
                  type="email"
                  label={t("Register.email")}
                  value={email}
                  onValueChange={setEmail}
                  isInvalid={isEmailInvalid}
                  color={isEmailInvalid ? "danger" : "success"}
                  errorMessage={isEmailInvalid && t("Register.emailTip")}
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                />
                <Input
                  isRequired
                  name="password"
                  label={t("Register.password")}
                  value={password}
                  onValueChange={setPassword}
                  isInvalid={isPasswordInvalid}
                  color={isPasswordInvalid ? "danger" : "success"}
                  errorMessage={isPasswordInvalid && t("Register.passwordTip")}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePassVisibility}
                    >
                      {isPassVisible ? (
                        <EyeSlashFilledIcon className="text-4xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-4xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isPassVisible ? "text" : "password"}
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                />
                <Input
                  isRequired
                  label={t("Register.confirm")}
                  value={cpassword}
                  onValueChange={setCPassword}
                  isInvalid={isConfirmInvalid}
                  color={isConfirmInvalid ? "danger" : "success"}
                  errorMessage={isConfirmInvalid && t("Register.confirmTip")}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleConfirmVisibility}
                    >
                      {isConfirmVisible ? (
                        <EyeSlashFilledIcon className="text-4xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-4xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isConfirmVisible ? "text" : "password"}
                  classNames={{
                    inputWrapper: "rounded-t-none",
                  }}
                />
              </div>
              <Checkbox
                isRequired
                className="py-4"
                size="sm"
                isSelected={isAgreeSelected}
                onValueChange={setIsAgreeSelected}
              >
                {t("Register.agreement1")}&nbsp;
                <Link
                  href="terms.html"
                  size="sm"
                  target="_blank"
                  className="z-50"
                >
                  {t("Register.terms")}
                </Link>
                &nbsp;{t("Register.agreement2")}&nbsp;
                <Link
                  href="privacy.html"
                  size="sm"
                  target="_blank"
                  className="z-50"
                >
                  {t("Register.privacy")}
                </Link>
              </Checkbox>
              <Button
                className="w-full"
                color="primary"
                type="submit"
                isDisabled={!isAgreeSelected || !isAllValid || !isAllFilled}
              >
                {t("Register.signup")}
              </Button>
            </Form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <p className="text-center text-small">
              {t("Register.already")}&nbsp;
              <Link
                className="cursor-pointer"
                onPress={() => router.push("/login")}
                size="sm"
              >
                {t("Register.login")}
              </Link>
            </p>
          </CardBody>
        </Card>
        <Modal
          size="xl"
          isOpen={isVerifyOpen}
          onOpenChange={setIsVerifyOpen}
          backdrop="blur"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 dark:text-white">
                  {t("Verify.title")}
                </ModalHeader>
                <ModalBody className="dark:text-white">
                  <p>{t("Verify.prompt")}</p>
                  <div className="flex justify-center py-4">
                    <InputOtp
                      autoFocus
                      value={otpValue}
                      onValueChange={setOtpValue}
                      length={6}
                      className="flex gap-2"
                    />
                  </div>
                  <p className="text-sm pt-2">{t("Verify.spamCheck")}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={handleVerify}>
                    {t("Verify.verifyButton")}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </DefaultLayout>
  );
}
