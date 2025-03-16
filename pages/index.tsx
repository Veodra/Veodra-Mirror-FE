import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { AltRightArrowIcon, GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";

export async function getStaticProps(context: { locale: any }) {
  return {
    props: {
      messages: (await import(`../intl/${context.locale}.json`)).default,
    },
  };
}

export default function IndexPage() {
  const t = useTranslations("Index");
  const router = useRouter();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Veodra Mirror</span>
          <br />
          <div className={subtitle({ class: "mt-4" })}>
            {t("subtitle1")}
            <br />
            {t("subtitle2")}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            color="primary"
            variant="ghost"
            radius="full"
            onPress={() => router.push("/dashboard")}
            as={Link}
          >
            {t("getstarted")}
            <AltRightArrowIcon size={20} />
          </Button>
        </div>
        <Accordion variant="splitted" className="max-w-lg">
          <AccordionItem
            key="1"
            aria-label="why"
            title={t("Accordion.question1")}
          >
            <p>{t("Accordion.answer1")}</p>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="how"
            title={t("Accordion.question2")}
          >
            <p>{t("Accordion.answer2")}</p>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="howmuch"
            title={t("Accordion.question3")}
          >
            <p>{t("Accordion.answer3")}</p>
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="attention"
            title={t("Accordion.question4")}
          >
            <p>{t("Accordion.answer4-1")}</p>
            <p>{t("Accordion.answer4-2")}</p>
            <p>{t("Accordion.answer4-3")}</p>
          </AccordionItem>
        </Accordion>
      </section>
    </DefaultLayout>
  );
}
