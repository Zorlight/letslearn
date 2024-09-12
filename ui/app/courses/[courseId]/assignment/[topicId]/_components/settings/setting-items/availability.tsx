"use client";
import { dateToZonedDateTime, zonedDateTimeToDate } from "@/lib/nextui/utils";
import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

export type AvailabilitySettingForm = {
  allowSubmissionForm: {
    enabled: boolean;
    value: string;
  };
  dueDate: {
    enabled: boolean;
    value: string;
  };
  cutOffDate: {
    enabled: boolean;
    value: string;
  };
  remind: {
    enabled: boolean;
    value: string;
  };
};
const schema: ZodType<AvailabilitySettingForm> = z.object({
  allowSubmissionForm: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  dueDate: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  cutOffDate: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  remind: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
});

interface AvailabilitySettingProps {
  initValue: AvailabilitySettingForm;
  onChange?: (data: AvailabilitySettingForm) => void;
}

const AvailabilitySetting = ({
  initValue,
  onChange,
}: AvailabilitySettingProps) => {
  const { allowSubmissionForm } = initValue;
  const form = useForm<AvailabilitySettingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      allowSubmissionForm: allowSubmissionForm,
      dueDate: initValue.dueDate,
      cutOffDate: initValue.cutOffDate,
      remind: initValue.remind,
    },
  });
  const { setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: AvailabilitySettingForm) => {
    if (onChange) onChange(data);
  };

  const handleEnableChange = (
    key: keyof AvailabilitySettingForm,
    value: boolean
  ) => {
    setValue(key, { ...getValues(key), enabled: value });
    handleSettingChange({
      ...getValues(),
      [key]: { ...getValues(key), enabled: value },
    });
  };

  const handleDatePickerChange = (
    key: keyof AvailabilitySettingForm,
    zoneDatetime: ZonedDateTime
  ) => {
    const date = zonedDateTimeToDate(zoneDatetime);
    setValue(key, { ...getValues(key), value: date.toISOString() });
    handleSettingChange({
      ...getValues(),
      [key]: { ...getValues(key), value: date.toISOString() },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <RowSettingWithDatePicker
        title="Allow submission form"
        form={initValue}
        keyProp="allowSubmissionForm"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Due date"
        form={initValue}
        keyProp="dueDate"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Cut-off date"
        form={initValue}
        keyProp="cutOffDate"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Remind me to grade by"
        form={initValue}
        keyProp="remind"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />

      <div className="flex flex-row justify-center">
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
};

interface RowSettingWithDatePickerProps {
  title: string;
  keyProp: keyof AvailabilitySettingForm;
  form: AvailabilitySettingForm;
  showMonthAndYearPickers?: boolean;
  handleEnableChange: (
    key: keyof AvailabilitySettingForm,
    value: boolean
  ) => void;
  handleDatePickerChange: (
    key: keyof AvailabilitySettingForm,
    zoneDatetime: ZonedDateTime
  ) => void;
}
const RowSettingWithDatePicker = ({
  title,
  keyProp,
  form,
  showMonthAndYearPickers = true,
  handleEnableChange,
  handleDatePickerChange,
}: RowSettingWithDatePickerProps) => {
  const htmlFor = nanoid();
  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[180px] font-semibold">{title}</label>
      <div className="w-full flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id={htmlFor}
            defaultChecked={form[keyProp].enabled}
            onCheckedChange={(checked) =>
              handleEnableChange(keyProp, !!checked)
            }
          />
          <label htmlFor={htmlFor}>Enable</label>
        </div>
        <DatePicker
          variant="bordered"
          isDisabled={!form[keyProp].enabled}
          hideTimeZone
          showMonthAndYearPickers={showMonthAndYearPickers}
          defaultValue={
            form[keyProp]
              ? dateToZonedDateTime(new Date(form[keyProp].value))
              : now(getLocalTimeZone())
          }
          radius="sm"
          className="w-full"
          color="primary"
          onChange={(zoneDatetime) =>
            handleDatePickerChange(keyProp, zoneDatetime)
          }
          dateInputClassNames={{
            inputWrapper: "border",
          }}
        />
      </div>
    </div>
  );
};

export default AvailabilitySetting;
