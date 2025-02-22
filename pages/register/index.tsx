import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { useTranslations } from "next-intl";
import React from "react";
/*import axios from 'axios';
import CryptoJS from 'crypto-js';

function encryptData(data: string): string {
    return CryptoJS.SHA256(data).toString();
}
*/
export async function getStaticProps(context: { locale: any; }) {
    return {
      props: {
        messages: (await import(`../../intl/${context.locale}.json`)).default
      }
    };
}
async function modifyUserInfoOnServer() {
    /*
    try {
        
        const encryptedPassword = encryptData(password);
        const encryptedRealname = encryptData(realname);

        const response = await axios.post('http://154.9.28.247/modifyUserInfo', {
            username: username,
            email: email,
            usertype: usertype,
            realname: encryptedRealname,
            password: encryptedPassword
        });
        console.log('用户信息已成功修改！');
    } catch (error) {
        console.error('修改用户信息时出错：', error);
    }
    */
    location.href = "/"
}

export default function RegisterPage() {
    const t = useTranslations("Register");
    
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const togglePassVisibility = () => setIsPassVisible(!isPassVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cpassword, setCPassword] = React.useState("");
    const [invalidNow, setInvalidNow] = React.useState(false);
    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const validateUsername = (username: string) =>
        /^[a-zA-Z0-9_-]{3,20}$/.test(username);
    const isUsernameInvalid = React.useMemo(() => {
        if (username === "") return false;
        return validateUsername(username) ? false : true;
    }, [username]);

    const validatePassword = (password: string) =>
        password.length >= 8;    
    const isPasswordInvalid = React.useMemo(() => {
        if (password === "") return false;
        return validatePassword(password) ? false : true;
    }, [password]);

    const validateConfirm = (cpassword: string) =>
        cpassword === password;

    const isConfirmInvalid = React.useMemo(() => {
        if (cpassword === "") return false;
        return validateConfirm(cpassword) ? false : true;
    }, [cpassword]);

    function checkinfo() {
        if (!((!isEmailInvalid && email != "") && (!isUsernameInvalid && username != "") && (!isPasswordInvalid && password != ""))) {
            console.log(isEmailInvalid, isUsernameInvalid, isPasswordInvalid)
            setInvalidNow(false)
        } else {
            setInvalidNow(true)
        }
        onOpen();
    }

    return (
        <DefaultLayout>
            <section className="flex items-center justify-center">
                <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 flex w-5/6 max-w-lg flex-col gap-4 rounded-large">
                    <CardBody>
                        <p className="text-2xl font-bold text-center">{t("title")}</p>
                        <p className="text-md text-default-500 text-center">{t("subtitle")}</p>
                        <Form className="px-4 py-12 items-center justify-centerflex flex-col gap-3" validationBehavior="native">
                            <div className="flex flex-col w-full">
                                <Input 
                                    isRequired 
                                    isClearable 
                                    type="username" 
                                    label={t("username")}
                                    value={username} 
                                    onValueChange={setUsername} 
                                    isInvalid={isUsernameInvalid} 
                                    color={isUsernameInvalid ? "danger" : "success"} 
                                    errorMessage={isUsernameInvalid && t("usernameTip")}
                                    classNames={{
                                        base: "-mb-[2px]",
                                        inputWrapper:
                                          "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                                    }}
                                />
                                <Input 
                                    isRequired 
                                    isClearable 
                                    type="email" 
                                    label={t("email")}
                                    value={email} 
                                    onValueChange={setEmail} 
                                    isInvalid={isEmailInvalid} 
                                    color={isEmailInvalid ? "danger" : "success"} 
                                    errorMessage={isEmailInvalid && t("emailTip")}
                                    classNames={{
                                        base: "-mb-[2px]",
                                        inputWrapper: "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                                    }}
                                />
                                <Input 
                                    isRequired 
                                    label={t("password")} 
                                    value={password} 
                                    onValueChange={setPassword} 
                                    isInvalid={isPasswordInvalid} 
                                    color={isPasswordInvalid ? "danger" : "success"} 
                                    errorMessage={isPasswordInvalid && t("passwordTip")}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={togglePassVisibility}>
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
                                        inputWrapper: "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                                    }}
                                />
                                <Input 
                                    isRequired 
                                    label={t("confirm")}
                                    value={cpassword} 
                                    onValueChange={setCPassword} 
                                    isInvalid={isConfirmInvalid} 
                                    color={isConfirmInvalid ? "danger" : "success"} 
                                    errorMessage={isConfirmInvalid && t("confirmTip")}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleConfirmVisibility}>
                                        {isConfirmVisible ? (
                                            <EyeSlashFilledIcon className="text-4xl text-default-400 pointer-events-none"/>
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
                            <Checkbox isRequired className="py-4" size="sm">
                                {t("agreement1")}&nbsp;
                                <Link href="terms.html" size="sm" target="_blank" className="z-50">
                                    {t("terms")}
                                </Link>
                                &nbsp;{t("agreement2")}&nbsp;
                                <Link href="privacy.html" size="sm" target="_blank" className="z-50">
                                    {t("privacy")}
                                </Link>
                            </Checkbox>
                            <Button className="w-full" color="primary" type="submit">
                                {t("signup")}
                            </Button>
                        </Form>
                        <div className="flex items-center gap-4 py-2">
                            <Divider className="flex-1" />
                        <p className="shrink-0 text-tiny text-default-500">OR</p>
                            <Divider className="flex-1" />
                        </div>
                        <p className="text-center text-small">
                            {t("already")}&nbsp;
                            <Link href="/login" size="sm">
                                {t("login")}
                            </Link>
                        </p>
                    </CardBody>
                </Card>
                <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1 dark:text-white">{invalidNow ? "Discagora Policy" : "Information not finished"}</ModalHeader>
                        <ModalBody className="dark:text-white">
                            {invalidNow ? <><p style={{color: "#ff0000", fontWeight: "900"}}>Please read this policy CAREFULLY.</p>
                            <p>Hope to make a better place! </p></> : <p>Your information have not finished.</p>}
                        </ModalBody>
                        <ModalFooter>
                            {invalidNow ? <><Button color="danger" variant="flat" onPress={onClose} disabled>I disagree</Button>
                            <Button color="primary" onPress={() => modifyUserInfoOnServer()}>I agree</Button></> : <Button color="danger" variant="solid" onPress={onClose}>OK</Button>}
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </section>
        </DefaultLayout>
    )
}