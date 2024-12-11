import { dateToZonedDateTime, zonedDateTimeToDate } from "@/lib/nextui/utils";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { cn } from "@/lib/utils";
import { MeetingTopic } from "@/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { nanoid } from "@reduxjs/toolkit";
import { Clock, Scroll, TextSelect } from "lucide-react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import SettingRow from "./setting-row";
import { Button } from "@/lib/shadcn/button";

interface Props {
  meetting: MeetingTopic;
  className?: string;
  onSubmit?: (data: MeetingTopic) => void;
}

export type MeetingForm = {
  title: string;
  description: string;
  open: string;
};

const schema: ZodType<MeetingForm> = z.object({
  title: z.string().min(1, "Title must be at least 1 character"),
  description: z.string(),
  open: z.string(),
});

export default function SettingForm({ meetting, className, onSubmit }: Props) {
  const { open } = meetting.data;
  const handleGetMeetingSetting = (meeting: MeetingTopic) => {
    const { title, data } = meeting;
    const { description, open } = data;
    const meetingSetting: MeetingForm = {
      title,
      description,
      open,
    };
    return meetingSetting;
  };
  const initMeetingSetting = handleGetMeetingSetting(meetting);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initMeetingSetting,
  });
  const { setValue, watch, register } = form;
  const { title, description } = watch();
  const handleInputChange = (key: keyof MeetingForm) => (e: any) => {
    setValue(key, e.target.value);
  };
  const handleDatePickerChange = (zoneDatetime: ZonedDateTime) => {
    const date = zonedDateTimeToDate(zoneDatetime);
    setValue("open", date.toISOString());
  };
  const handleEditorChange = (key: keyof MeetingForm) => (value: string) => {
    setValue(key, value);
  };
  const handleGetMeetingSettingToSave = (data: MeetingForm) => {
    const { title, description, open } = data;
    const meetingSetting: MeetingTopic = {
      ...meetting,
      title,
      data: {
        description,
        open,
      },
    };
    return meetingSetting;
  };
  const handleSubmit = (data: MeetingForm) => {
    const meetingSetting = handleGetMeetingSettingToSave(data);
    if (onSubmit) onSubmit(meetingSetting);
  };

  const titleHtmlFor = nanoid();
  const datePickerHtmlFor = nanoid();
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <SettingRow
        label={<Scroll className="text-gray-500" />}
        htmlFor={titleHtmlFor}
      >
        <Input
          id={titleHtmlFor}
          placeholder="Meeting title"
          defaultValue={title !== "" ? title : undefined}
          {...register("title")}
          onChange={handleInputChange("title")}
        />
      </SettingRow>
      <SettingRow
        label={<Clock className="text-gray-500" />}
        htmlFor={datePickerHtmlFor}
      >
        <DatePicker
          id={datePickerHtmlFor}
          variant="bordered"
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={dateToZonedDateTime(new Date(open))}
          radius="sm"
          className="w-full"
          color="primary"
          onChange={handleDatePickerChange}
          dateInputClassNames={{
            inputWrapper: "border",
          }}
        />
      </SettingRow>
      <SettingRow label={<TextSelect className="text-gray-500" />}>
        <TinyEditor
          initValue={description}
          onChange={handleEditorChange("description")}
        />
      </SettingRow>
      <div className="w-full flex items-center justify-center">
        <Button
          type="submit"
          variant="cyan"
          className="w-fit rounded-lg font-bold"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
