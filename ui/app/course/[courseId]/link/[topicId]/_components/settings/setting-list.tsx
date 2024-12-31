"use client";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { useDebounceFunction } from "@/hooks/useDebounce";
import { Button } from "@/lib/shadcn/button";
import { FileTopic, LinkTopic } from "@/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import { defaultGeneralSetting } from "./static-data";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  title: z.string().min(1, "File name must be at least 1 character"),
  // file type CloudinaryFile
  url: z.string().nullable(),
  description: z.string(),
});
export type LinkSettingForm = {
  generalSettingForm: GeneralSettingForm;
};

// Combine child schemas into one
const schema: ZodType<LinkSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
});

interface Props {
  topic: LinkTopic;
  onSubmitFileSetting?: (data: LinkTopic) => void;
}
const SettingList = ({ topic, onSubmitFileSetting }: Props) => {
  const handleGetGeneralSetting = (topic: LinkTopic) => {
    const { title, data } = topic;
    const { description, url } = data;

    const generalSetting: GeneralSettingForm = {
      title,
      description,
      url,
    };
    return generalSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return topic ? handleGetGeneralSetting(topic) : defaultGeneralSetting;
  }, [topic]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
    },
  });
  const { setValue, watch } = form;
  const { errors } = form.formState;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = useDebounceFunction(
    (data: GeneralSettingForm) => setValue("generalSettingForm", data)
  );

  const handleGetFileToUpdate = (form: LinkSettingForm) => {
    const { generalSettingForm } = form;
    const { title, description, url } = generalSettingForm;
    const topicToUpdate: LinkTopic = {
      ...topic,
      title,
      data: {
        ...topic.data,
        description,
        url,
      },
    };

    return topicToUpdate;
  };

  const compareTopicFile = (topic1: LinkTopic, topic2: LinkTopic) => {
    const topic1JSON = JSON.stringify(topic1);
    const topic2JSON = JSON.stringify(topic2);
    return topic1JSON === topic2JSON;
  };

  const onSubmit = (data: LinkSettingForm) => {
    const toSubmit = handleGetFileToUpdate(data);
    if (!isSettingChange) {
      toast.info("No changes to submit");
      return;
    }
    console.log("ToSubmit", toSubmit);
    if (onSubmitFileSetting) onSubmitFileSetting(toSubmit);
  };

  const titles = ["General", "Availability", "Submission"];
  const isSettingChange = useMemo(() => {
    console.log("topic", topic);
    console.log("form", form.getValues());
    return !compareTopicFile(topic, handleGetFileToUpdate(form.getValues()));
  }, [topic, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
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
