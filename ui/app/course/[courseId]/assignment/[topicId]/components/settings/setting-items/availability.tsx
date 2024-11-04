"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { AssignmentSettingForm } from "../setting-list";
import { dateToZonedDateTime, zonedDateTimeToDate } from "@/lib/nextui/utils";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { DatePicker } from "@nextui-org/date-picker";
import { nanoid } from "@reduxjs/toolkit";

export type AvailabilitySettingForm = {
  open: {
    enabled: boolean;
    value: string;
  };
  close: {
    enabled: boolean;
    value: string;
  };
  remindToGrade: {
    enabled: boolean;
    value: string;
  };
};

interface Props {
  formData: AvailabilitySettingForm;
  onChange?: (data: AvailabilitySettingForm) => void;
}

export default function AvailabilitySetting({ formData, onChange }: Props) {
  const form = useFormContext<AssignmentSettingForm>();
  const { register } = form;
  const {
    errors: { availabilitySettingForm: errors },
  } = form.formState;
  const { open, close, remindToGrade } = formData;
  const handleSettingChange = (data: AvailabilitySettingForm) => {
    if (onChange) onChange(data);
  };
  const handleEnableChange = (
    key: keyof AvailabilitySettingForm,
    value: boolean
  ) => {
    handleSettingChange({
      ...formData,
      [key]: { ...formData[key], enabled: value },
    });
  };

  const handleDatePickerChange = (
    key: keyof AvailabilitySettingForm,
    zoneDatetime: ZonedDateTime
  ) => {
    const date = zonedDateTimeToDate(zoneDatetime);
    handleSettingChange({
      ...formData,
      [key]: { ...formData[key], value: date.toISOString() },
    });
  };

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSettingWithDatePicker
        title="Allow submission from"
        form={formData}
        keyProp="open"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Close assignment"
        form={formData}
        keyProp="close"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Remind me to grade"
        form={formData}
        keyProp="remindToGrade"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
    </div>
  );
}

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
          <label htmlFor={htmlFor} className="cursor-pointer">
            Enable
          </label>
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
