"use client";
import { dateToZonedDateTime, zonedDateTimeToDate } from "@/lib/nextui/utils";
import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { Input } from "@/lib/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { nanoid } from "@reduxjs/toolkit";
import { CirclePlus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

export type OptionsSettingForm = {
  allowUpdateChoice: boolean;
  allowMultipleChoice: boolean;
  limitResponses: boolean;
  showAvailableSpace: boolean;
  options: {
    option: string;
    limit: number;
  }[];
};
const schema: ZodType<OptionsSettingForm> = z.object({
  allowUpdateChoice: z.boolean(),
  allowMultipleChoice: z.boolean(),
  limitResponses: z.boolean(),
  showAvailableSpace: z.boolean(),
  options: z.array(
    z.object({
      option: z.string(),
      limit: z.number(),
    })
  ),
});

interface AvailabilitySettingProps {
  initValue: OptionsSettingForm;
  onChange?: (data: OptionsSettingForm) => void;
}

const OptionsSetting = ({ initValue, onChange }: AvailabilitySettingProps) => {
  const {
    allowUpdateChoice,
    allowMultipleChoice,
    limitResponses,
    showAvailableSpace,
    options,
  } = initValue;
  const form = useForm<OptionsSettingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      allowUpdateChoice: allowUpdateChoice,
      allowMultipleChoice: allowMultipleChoice,
      limitResponses: limitResponses,
      showAvailableSpace: showAvailableSpace,
      options: options,
    },
  });
  const { setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: OptionsSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleCheckedChange = (
    key: keyof OptionsSettingForm,
    checked: boolean
  ) => {
    setValue(key, checked);
    handleSettingChange({ ...getValues(), [key]: checked });
  };

  const handleOptionChange = (option: string, index: number) => {
    const newOptions = [...options];
    newOptions[index].option = option;
    setValue("options", newOptions);
    handleSettingChange({ ...getValues(), options: newOptions });
  };

  const handleLimitChange = (limit: number, index: number) => {
    const newOptions = [...options];
    newOptions[index].limit = limit;
    setValue("options", newOptions);
    handleSettingChange({ ...getValues(), options: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...options, { option: "", limit: 0 }];
    setValue("options", newOptions);
    handleSettingChange({ ...getValues(), options: newOptions });
  };

  const handleRemoveOption = () => {
    const newOptions = [...options];
    newOptions.pop();
    setValue("options", newOptions);
    handleSettingChange({ ...getValues(), options: newOptions });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <CheckboxRowSetting
        title="Allow choice to be updated"
        checked={allowUpdateChoice}
        onCheckedChange={(checked) =>
          handleCheckedChange("allowUpdateChoice", checked)
        }
      />
      <CheckboxRowSetting
        title="Allow more than one choice to be selected"
        checked={allowMultipleChoice}
        onCheckedChange={(checked) =>
          handleCheckedChange("allowMultipleChoice", checked)
        }
      />
      <CheckboxRowSetting
        title="Limit the number of responses"
        checked={limitResponses}
        onCheckedChange={(checked) =>
          handleCheckedChange("limitResponses", checked)
        }
      />
      {limitResponses && (
        <CheckboxRowSetting
          title="Show available space"
          checked={showAvailableSpace}
          onCheckedChange={(checked) =>
            handleCheckedChange("showAvailableSpace", checked)
          }
        />
      )}

      {options.map((option, index) => (
        <OptionRowSetting
          key={index}
          optionKey={index}
          option={option.option}
          limit={limitResponses ? option.limit : null}
          onOptionChnage={(option) => handleOptionChange(option, index)}
          onLimitChange={(limit) => handleLimitChange(limit, index)}
        />
      ))}

      <div className="flex flex-row justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddOption}
        >
          <CirclePlus size={16} />
          Add new option
        </Button>
        {options.length > 2 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-red-500 border-red-600 hover:bg-red-50"
            onClick={handleRemoveOption}
          >
            <Trash size={16} />
            Remove last option
          </Button>
        )}
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
};

interface CheckboxRowSettingProps {
  title: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
const CheckboxRowSetting = ({
  title,
  checked,
  onCheckedChange,
}: CheckboxRowSettingProps) => {
  const htmlFor = nanoid();
  return (
    <div className="flex flex-row items-center gap-4">
      <Checkbox
        id={htmlFor}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(!!checked)}
      />
      <label htmlFor={htmlFor} className="w-fit font-semibold">
        {title}
      </label>
    </div>
  );
};

interface OptionRowSettingProps {
  option: string;
  limit: number | null;
  optionKey: number;
  onOptionChnage: (option: string) => void;
  onLimitChange: (limit: number) => void;
}
const OptionRowSetting = ({
  option,
  limit,
  optionKey,
  onOptionChnage,
  onLimitChange,
}: OptionRowSettingProps) => {
  const opitonHtmlFor = nanoid();
  const limitHtmlFor = nanoid();
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <label htmlFor={opitonHtmlFor} className="w-[80px] font-semibold">
          {`Option ${optionKey + 1}`}
        </label>
        <Input
          id={opitonHtmlFor}
          className="flex-1 focus:outline-none"
          placeholder={`Enter option ${optionKey + 1}`}
          defaultValue={option}
          onChange={(e) => onOptionChnage(e.target.value)}
        />
      </div>
      {limit !== null && (
        <div className="flex flex-row items-center gap-4">
          <label htmlFor={limitHtmlFor} className="w-[80px] font-semibold">
            {`Limit ${optionKey + 1}`}
          </label>
          <Input
            id={limitHtmlFor}
            className="flex-1 focus:outline-none"
            placeholder="Enter a number"
            type="number"
            defaultValue={limit != 0 ? limit : undefined}
            onChange={(e) => onLimitChange(parseInt(e.target.value))}
          />
        </div>
      )}
    </>
  );
};

export default OptionsSetting;
