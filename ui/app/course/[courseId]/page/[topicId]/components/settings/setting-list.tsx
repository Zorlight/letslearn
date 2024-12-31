"use client";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { Button } from "@/lib/shadcn/button";
import { PageTopic } from "@/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import ContentSetting, { ContentSettingForm } from "./setting-items/content";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import { defaultContentSetting, defaultGeneralSetting } from "./static-data";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

const contentSettingSchema: ZodType<ContentSettingForm> = z.object({
  content: z.string(),
});

export type PageSettingForm = {
  generalSettingForm: GeneralSettingForm;
  contentSettingForm: ContentSettingForm;
};

// Combine child schemas into one
const schema: ZodType<PageSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
  contentSettingForm: contentSettingSchema,
});

interface Props {
  page: PageTopic;
  onSubmitPageSetting?: (data: PageTopic) => void;
}
const SettingList = ({ page, onSubmitPageSetting }: Props) => {
  const handleGetGeneralSetting = (page: PageTopic) => {
    const generalSetting: GeneralSettingForm = {
      name: page.title,
      description: page.data.description,
    };
    return generalSetting;
  };

  const handleGetContentSettings = (page: PageTopic) => {
    const contentSetting: ContentSettingForm = {
      content: page.data.content,
    };
    return contentSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return page ? handleGetGeneralSetting(page) : defaultGeneralSetting;
  }, [page]);
  const initContentSetting = useMemo(() => {
    return page ? handleGetContentSettings(page) : defaultContentSetting;
  }, [page]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      contentSettingForm: initContentSetting,
    },
  });
  const { setValue, watch } = form;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = (data: GeneralSettingForm) => {
    setValue("generalSettingForm", data);
  };

  const handleContentSettingChange = (data: ContentSettingForm) => {
    setValue("contentSettingForm", data);
  };

  const handleGetPageToUpdate = (data: PageSettingForm) => {
    const toUpdate: PageTopic = {
      ...page,
      title: data.generalSettingForm.name,
      data: {
        ...page.data,
        description: data.generalSettingForm.description,
        content: data.contentSettingForm.content,
      },
    };

    return toUpdate;
  };

  const comparePage = (page1: PageTopic, page2: PageTopic) => {
    const json1 = JSON.stringify(page1);
    const json2 = JSON.stringify(page2);
    return json1 === json2;
  };

  const isSettingChange = useMemo(() => {
    return !comparePage(page, handleGetPageToUpdate(form.getValues()));
  }, [page, form.getValues()]);
  const onSubmit = (data: PageSettingForm) => {
    const toSubmit = handleGetPageToUpdate(data);
    if (!isSettingChange) {
      toast.info("No changes to submit");
      return;
    }
    if (onSubmitPageSetting) onSubmitPageSetting(toSubmit);
  };

  const titles = ["General", "Content"];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles} initShowContent={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
          <ContentSetting
            formData={watch("contentSettingForm")}
            onChange={handleContentSettingChange}
          />
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button type="submit" disabled={!isSettingChange} variant="default">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingList;
