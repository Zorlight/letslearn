"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

export type GeneralSettingForm = {
  name: string;
  description: string;
};
const schema: ZodType<GeneralSettingForm> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

interface GeneralSettingProps {
  initValue: GeneralSettingForm;
  onChange?: (data: GeneralSettingForm) => void;
}

const GeneralSetting = ({ initValue, onChange }: GeneralSettingProps) => {
  const { name, description } = initValue;
  const form = useForm<GeneralSettingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      description,
    },
  });
  const { register, setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: GeneralSettingForm) => {
    if (onChange) onChange(data);
  };
  const handleEditorChange = (key: keyof GeneralSettingForm, data: any) => {
    //set value because the editor is not a controlled component (not registered with react-hook-form)
    setValue(key, data);
    handleSettingChange({ ...getValues(), description: data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <RowSetting
        title="Assigment name"
        htmlFor="general-setting-assigmentName"
      >
        <Input
          id="general-setting-name"
          className="flex-1 focus:outline-none"
          placeholder="Enter a name"
          {...register("name")}
          onChange={(e) =>
            handleSettingChange({
              ...getValues(),
              name: e.target.value,
            })
          }
        />
        {errors.name && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.name.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Description">
        <TinyEditor
          onChange={(data) => handleEditorChange("description", data)}
          initValue={description}
        />
      </RowSetting>
      <div className="flex flex-row justify-center">
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
};

interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
}
const RowSetting = ({ title, children, htmlFor }: RowProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[180px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

export default GeneralSetting;
