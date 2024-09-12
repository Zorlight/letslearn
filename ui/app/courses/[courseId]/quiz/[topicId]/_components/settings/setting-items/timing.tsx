"use client";
import { dateToZonedDateTime, zonedDateTimeToDate } from "@/lib/nextui/utils";
import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { unknown, z, ZodType } from "zod";
import { TimeLimitType } from "../../static-data";
import { Input } from "@/lib/shadcn/input";
import { Combobox } from "@/components/ui/combobox";
import { ChevronsUpDown } from "lucide-react";

export type TimingSettingForm = {
  open: {
    enabled: boolean;
    value: string;
  };
  close: {
    enabled: boolean;
    value: string;
  };
  timeLimit: {
    enabled: boolean;
    value: number;
    unit: TimeLimitType;
  };
};
const schema: ZodType<TimingSettingForm> = z.object({
  open: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  close: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  timeLimit: z.object({
    enabled: z.boolean(),
    value: z.number(),
    unit: z.nativeEnum(TimeLimitType),
  }),
});

interface TimingSettingProps {
  initValue: TimingSettingForm;
  onChange?: (data: TimingSettingForm) => void;
}

const TimingSetting = ({ initValue, onChange }: TimingSettingProps) => {
  const { open, close, timeLimit } = initValue;
  const form = useForm<TimingSettingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      open,
      close,
      timeLimit,
    },
  });
  const { setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: TimingSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleEnableChange = (key: keyof TimingSettingForm, value: boolean) => {
    setValue(key, { ...getValues(key), enabled: value });
    handleSettingChange({
      ...getValues(),
      [key]: { ...getValues(key), enabled: value },
    });
  };

  const handleDatePickerChange = (
    key: keyof TimingSettingForm,
    zoneDatetime: ZonedDateTime
  ) => {
    const date = zonedDateTimeToDate(zoneDatetime);
    setValue(key, { ...getValues(key), value: date.toISOString() });
    handleSettingChange({
      ...getValues(),
      [key]: { ...getValues(key), value: date.toISOString() },
    });
  };

  const handleInputChange = (key: keyof TimingSettingForm, value: number) => {
    const newSetting = { ...getValues() };
    newSetting[key].value = value;
    setValue(key, newSetting[key]);
    handleSettingChange(newSetting);
  };

  const handleComboboxChange = (
    key: keyof TimingSettingForm,
    value: string
  ) => {
    const newSetting = { ...getValues() };
    if ("unit" in newSetting[key] && typeof newSetting[key].unit === "string")
      newSetting[key].unit = value;
    setValue(key, newSetting[key]);
    handleSettingChange(newSetting);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <RowSettingWithDatePicker
        title="Open the quiz"
        form={initValue}
        keyProp="open"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Close the quiz"
        form={initValue}
        keyProp="close"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithCombobox
        title="Time limit"
        form={initValue}
        keyProp="timeLimit"
        options={Object.values(TimeLimitType)}
        handleEnableChange={handleEnableChange}
        handleInputChange={handleInputChange}
        handleComboboxChange={handleComboboxChange}
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
  keyProp: keyof TimingSettingForm;
  form: TimingSettingForm;
  showMonthAndYearPickers?: boolean;
  handleEnableChange: (key: keyof TimingSettingForm, value: boolean) => void;
  handleDatePickerChange: (
    key: keyof TimingSettingForm,
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

interface RowSettingWithComboboxProps {
  title: string;
  keyProp: keyof TimingSettingForm;
  form: TimingSettingForm;
  options: string[];
  handleEnableChange: (key: keyof TimingSettingForm, value: boolean) => void;
  handleInputChange: (key: keyof TimingSettingForm, value: number) => void;
  handleComboboxChange: (key: keyof TimingSettingForm, value: string) => void;
}
const RowSettingWithCombobox = ({
  title,
  keyProp,
  form,
  options,
  handleEnableChange,
  handleInputChange,
  handleComboboxChange,
}: RowSettingWithComboboxProps) => {
  const htmlFor = nanoid();
  let unit: string = "";
  if ("unit" in form[keyProp] && typeof form[keyProp].unit === "string")
    unit = form[keyProp].unit;
  else unit = options.length > 0 ? options[0] : "No unit";

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

        <Input
          className="w-[150px] focus:outline-none"
          placeholder="Enter time limit"
          disabled={!form[keyProp].enabled}
          type="number"
          defaultValue={form[keyProp].value}
          onChange={(e) => handleInputChange(keyProp, parseInt(e.target.value))}
        />
        <Combobox
          name="Unit"
          options={options}
          initialValue={options[0]}
          onChange={(value) => handleComboboxChange(keyProp, value)}
          popoverClassName="w-[150px]"
        >
          <Button
            variant="outline"
            className="w-[150px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
            disabled={!form[keyProp].enabled}
          >
            {unit}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </div>
    </div>
  );
};

export default TimingSetting;
