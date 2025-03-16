import { AltRightArrowIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
export async function getStaticProps(context: { locale: any }) {
  return {
    props: {
      messages: (await import(`../../intl/${context.locale}.json`)).default,
    },
  };
}
export default function DocsPage() {
  const t = useTranslations("Docs");
  const router = useRouter();
  return (
    <DefaultLayout>
      <section className="container px-8 py-24 sm:p-24">
        <h1 className="text-4xl sm:text-[2.5rem] font-semibold">
          {t("title")}
        </h1>
        <h2 className="text-xl sm:text-2xl text-default-600 my-8">
          {t("subtitle")}
        </h2>
        <Button
          color="secondary"
          variant="ghost"
          radius="full"
          onPress={() => router.push("docs/getting-started")}
        >
          {t("start")}
          <AltRightArrowIcon size={20} />
        </Button>
      </section>
    </DefaultLayout>
  );
}
