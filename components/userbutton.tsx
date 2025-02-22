import { Button } from "@heroui/button"
import { UserIcon } from "@/components/icons"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export const UserButton = () => {
    const router = useRouter();
    const t = useTranslations();
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly aria-label="User" variant="flat">
                    <UserIcon className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="login" href={"/"+router.locale+"/login"}>{t("Login.login")}</DropdownItem>
                <DropdownItem key="signup" href={"/"+router.locale+"/register"}>{t("Register.signup")}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}